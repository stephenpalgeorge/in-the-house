import { Request, Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware';
import { userService } from '../services';
import {
  IAuthRouteReturn,
  IBasicResponse,
  IDataRequest,
  IErrorObject,
} from '@in-the-house/api-interfaces';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Auth routes are used for creating, managing and accessing user accounts.');
});

/**
 * CREATE NEW USER
 * ----------
 * @method 'POST'
 * '/api/auth/signup'
 * The response includes a simple success message and the userId,
 * we don't send the full user data at this point as we would now
 * require the user to login after having created their account.
 * The user/:id route will return the full user object.
 * 
 */
router.post('/signup', [
  check('email')
    .not().isEmpty()
    .withMessage('You must provide an email.')
    .isEmail()
    .withMessage('You must provide a valid email address.')
    .normalizeEmail(),
  check('password')
    .not().isEmpty()
    .withMessage('You must provide a password.')
    .isLength({min: 8})
    .withMessage('Password must have at least 8 characters.'),
  check('username')
    .not().isEmpty()
    .withMessage('You must provide a username.')
], async(req: Request, res: Response) => {
  try {
    // as a minimum, to create an account we need a username,
    // email and password. These should all be on the request body.
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(422).json(errors.array());
    // create the user and return depending on success or error:
    const { email, password, username } = req.body;
    const newUser: IBasicResponse = await userService.createUser(email, password, username);
    if (newUser.status === 'error') throw newUser.payload;
    else res.status(201).json({ user: newUser.payload });
  } catch (err) {
    const error: IErrorObject = { type: 'Unprocessable Entity', message: err };
    res.status(422).json({ error });
  }
});

/**
 * LOGIN - AUTHENTICATE USER
 * ----------
 * @method 'POST'
 * '/api/auth/login'
 * The res includes the userId and a success message,
 * the full user data is returned by the user/:id route.
 * 
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    // username and password must exist on body:
    const { username, password } = req.body;
    if (!username || !password) throw 'missing credentials';

    // authenticate user and generate tokens
    const { userId, accessToken, message, refreshToken } = await userService.authenticate(username, password);
    if (!userId || !accessToken || !refreshToken) throw message;
    else res.status(200).cookie('refreshToken', refreshToken, {
      // ms in 10 days
      maxAge: 864_000_000,
      httpOnly: true,
    }).json({ userId, accessToken });
  } catch (err) {
    const error: IErrorObject = { type: 'Unauthorized', message: err };
    res.status(401).json(error);
  }
});

/**
 * FETCH SINGLE USER
 * ----------
 * @method 'GET'
 * '/api/auth/user/:id' - where :id is a user's unique id.
 * The res includes the user data and, if the auth tokens were resigned,
 * the new access token to be stored on the front end.
 * 
 */
router.get(
  '/user/:id',
  authMiddleware.accessMiddleware,
  authMiddleware.refreshMiddleware,
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const user = await userService.fetchUser(userId);
    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: `No user found for id: ${userId}` }
      res.status(404).json(error);
    } else {
      const data: IAuthRouteReturn = { user };
      if (req.accessToken) data.accessToken = req.accessToken;
      res.status(200).json(data);
    }
  }
);

export default router;
