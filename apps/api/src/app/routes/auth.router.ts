import { Request, Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware';
import { userService } from '../services';
import {
  IAuthPropReturn,
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
 * '/auth/signup'
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
    // payload will be the userId in this scenario:
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
 * '/auth/login'
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
 * LOGOUT - UN-AUTHENTICATE USER
 * ----------
 * @method 'POST'
 * `/auth/logout`
 * Logout route simply removes the refreshToken cookie
 */
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('refreshToken').status(204).end();
});

/**
 * FETCH SINGLE USER
 * ----------
 * @method 'GET'
 * '/auth/user/:id' - where :id is a user's unique id.
 * The res includes the user data and, if the auth tokens were resigned,
 * the new access token to be stored on the front end.
 * 
 */
router.get(
  '/user/:id',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const user = await userService.fetchUser(userId);
    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: `No user found for id: ${userId}` }
      res.status(404).json(error);
    } else {
      const data: IAuthRouteReturn = { user };
      if (req.accessToken) data.accessToken = req.accessToken;
      if (req.refreshToken) res.cookie('refreshToken', req.refreshToken, {
        // miliseconds in 10 days
        maxAge: 864_000_000,
        httpOnly: true,
      });
      res.status(200).json(data);
    }
  }
);

/**
 * UPDATE SINGLE USER
 * ----------
 * '/auth/user/:id' - where :id is a user's unique id.
 * The res includes the updated user data and, if the auth tokens were resigned,
 * the new access token to be stored on the front end.
 * 
 */
router.put(
  '/user/:id',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const user = await userService.updateUserProfile(userId, req.body);
    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: `No user found for id: ${userId}` }
      res.status(404).json(error);
    } else {
      const data: IAuthRouteReturn = { user };
      if (req.accessToken) data.accessToken = req.accessToken;
      if (req.refreshToken) res.cookie('refreshToken', req.refreshToken, {
        // miliseconds in 10 days
        maxAge: 864_000_000,
        httpOnly: true,
      });
      res.status(200).json(data);
    }
  }
);

/**
 * UPDATE USER PASSWORD
 * ----------
 * '/auth/user/:id/change-password' - where :id is a user's unique id.
 * This route is solely for updating the password of a single user. As this 
 * requires extra checks and auth, it makes sense to separate it from the general
 * `update single user` function.
 * 
 */
router.put(
  '/user/:id/change-password',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const user = await userService.updateUserPassword(userId, req.body);
    if (!user) {
      const error: IErrorObject = { type: 'Internal server error', message: 'could not update the user password - check you correctly entered your current password.' }
      res.status(500).json(error);
    } else {
      const data: IAuthRouteReturn = { user };
      if (req.accessToken) data.accessToken = req.accessToken;
      if (req.refreshToken) res.cookie('refreshToken', req.refreshToken, {
        // miliseconds in 10 days
        maxAge: 864_000_000,
        httpOnly: true,
      });
      res.status(200).json(data);
    }
  }
);

/**
 * FETCH API KEY
 * ----------
 * '/auth/user/:id/fetch-key' - where :id is a user's unique id.
 * We have a dedicated route for retrieving the api_key. As this is sensitive
 * information, we never send it back with the rest of the user data and should only
 * load it when the relevant request is sent from the front end.
 * 
 */
router.post(
  '/user/:id/fetch-key',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const apiKey = await userService.fetchApiKey(userId);
    if (!apiKey || apiKey.length === 0) {
      const error: IErrorObject = { type: 'Not found', message: 'We couldn\'t find an api key for you - do you need to generate one?' };
      res.status(404).json(error);
    } else {
      const data: IAuthPropReturn = { apiKey };
      if (req.accessToken) data.accessToken = req.accessToken;
      if (req.refreshToken) res.cookie('refreshToken', {
        // miliseconds in 10 days
        maxAge: 864_000_000,
        httpOnly: true,
      });
      res.status(200).json(data);
    }
  }
);

/**
 * GENERATE API KEY
 * ----------
 * '/auth/user/:id/generate-key',
 */
router.post(
  '/user/:id/generate-key',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const apiKey = await userService.generateApiKey(userId);
    if (!apiKey) {
      const error: IErrorObject = { type: 'Server error', message: 'Could not create an API Key' };
      res.status(500).json(error);
    } else {
      const data: IAuthPropReturn = { apiKey };
      if (req.accessToken) data.accessToken = req.accessToken;
      if (req.refreshToken) res.cookie('refreshToken', {
        // miliseconds in 10 days
        maxAge: 864_000_000,
        httpOnly: true,
      });
      res.status(200).json(data);
    }
  }
)

export default router;
