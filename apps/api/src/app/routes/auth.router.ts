import { Request, Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { auth, mail } from '../helpers';
import { authMiddleware } from '../middleware';
import { userService } from '../services';
import {
  EmailTemplates,
  IAuthPropReturn,
  IAuthRouteReturn,
  IBasicResponse,
  IDataRequest,
  IErrorObject,
} from '@in-the-house/api-interfaces';
import { User } from '../models';

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
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
  check('username')
    .not().isEmpty()
    .withMessage('You must provide a username.')
], async (req: Request, res: Response) => {
  try {
    // as a minimum, to create an account we need a username,
    // email and password. These should all be on the request body.
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(422).json(errors.array());
    // create the user and return depending on success or error:
    const { email, password, username } = req.body;
    const newUser: IBasicResponse = await userService.createUser(email, password, username);
    if (newUser.status === 'error') throw newUser.payload;
    else {
      // send welcome and verification emails:
      mail.send(EmailTemplates.welcome, newUser.context);
      mail.send(EmailTemplates.verify, newUser.context);
      // payload will be the user object in this scenario:
      res.status(201).json({ user: newUser.payload });
    }
  } catch (err) {
    const error: IErrorObject = { type: 'Unprocessable Entity', message: err };
    res.status(422).json({ error });
  }
});

/**
 * DELETE ACCOUNT
 * ----------
 * @method 'DELETE'
 * '/auth/user/:id'
 * Find a user and remove the account, requires auth and password validation.
 * 
 */
router.delete(
  '/user/:id',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const { password } = req.body;
    const user = await userService.deleteUser(userId, password);

    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: 'Couldn\'t delete this user.' };
      res.status(404).json(error);
    } else {
      console.log('account deleted');
      // send goodbye email:
      mail.send(EmailTemplates.goodbye, user);
      // return the user id:
      res.status(200).json({ userId: user.id });
    }
  }
);

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
router.post('/logout', (_, res: Response) => {
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
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * UPDATE SINGLE USER
 * ----------
 * @method 'PUT'
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
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * UPDATE USER PASSWORD
 * ----------
 * @method 'PUT'
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
      // send password-change email:
      if (user.notifications.includes("password-changed")) mail.send(EmailTemplates.passwordChange, user);
      // send response
      const data: IAuthRouteReturn = { user };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * VERIFY USER
 * ----------
 * @method 'PUT'
 * 'auth/user/:id/verify' - where :id is a user's unique id.
 * This route is solely for updating the 'verification' property of a single user.
 * 
 */
router.put('/user/:id/verify', async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const { hash } = req.body;
  const user = await userService.verifyUser(userId, hash);
  if (!user) {
    const error: IErrorObject = { type: 'Bad request', message: 'Could not verify this user account' };
    res.status(400).json(error);
  } else {
    res.status(200).json({ user });
  }
});

/**
 * VERIFY RESEND
 * ----------
 * @method 'PUT'
 * 'auth/verify-resend'.
 * This route should expect an email address in the request body. It is responsible
 * for then generating a new verification hash and emailing the user with an updated link.
 * 
 */
router.put('/verify-resend', async (req: Request, res: Response) => {
  console.log(req.body);
  const { email } = req.body;
  const user = await userService.verifyResend(email);
  if (!user) {
    const error: IErrorObject = { type: 'Unauthorized', message: 'Could not find a user with that email address.' };
    res.status(401).json(error);
  } else {
    // send verification email:
    mail.send(EmailTemplates.verify, user);
    // send response:
    res.status(200).json({ user });
  }
});

/**
 * FETCH API KEY
 * ----------
 * @method 'POST'
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
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * GENERATE API KEY
 * ----------
 * @method 'POST'
 * '/auth/user/:id/generate-key',
 */
router.post(
  '/user/:id/generate-key',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const response = await userService.generateApiKey(userId);
    if (!response) {
      const error: IErrorObject = { type: 'Server error', message: 'Could not create an API Key' };
      res.status(500).json(error);
    } else {
      // send notification email:
      if (response.user.notifications.includes('new-api-key')) mail.send(EmailTemplates.newApiKey, response.user);
      // send response
      const data: IAuthPropReturn = { apiKey: response.key };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * FETCH PROJECTS
 * ----------
 * @method 'POST'
 * '/auth/user/:id/projects',
 */
router.post(
  '/user/:id/projects',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const projects = await userService.fetchProjects(userId);
    if (!projects || projects.length === 0) {
      const error: IErrorObject = { type: 'Internal server error', message: 'could not fetch projects for this user, do you have any setup yet?' };
      res.status(500).json(error);
    } else {
      const data: IAuthPropReturn = { projects };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * ADD PROJECT
 * ----------
 * @method 'POST'
 * '/auth/user/:id/project',
 * 
 */
router.post(
  '/user/:id/project',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const { origin } = req.body;
    const projects = await userService.addProject(userId, origin);
    if (!projects || projects.length === 0) {
      const error: IErrorObject = { type: 'Not acceptable', message: 'could not add your project. You may have reached the limit for your current account type, or already have a project with this origin?' }
      res.status(406).json(error);
    } else {
      const data: IAuthPropReturn = { projects };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * DELETE PROJECT
 * ----------
 * @method 'DELETE'
 * '/auth/user/:id/project'
 * 
 */
router.delete(
  '/user/:id/project',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const { projId } = req.body;
    const response = await userService.deleteProject(userId, projId);
    if (!response) {
      const error: IErrorObject = { type: 'Bad request', message: 'could not delete your project.' }
      res.status(400).json(error);
    } else {
      // send notification email:
      if (response.user.notifications.includes('project-deletion')) mail.send(EmailTemplates.projectDelete, response.user, { projectName: response.targetProject });
      // send response:
      const data: IAuthPropReturn = { projects: response.projects };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * UPDATE NOTIFICATIONS
 * ----------
 * @method 'PUT'
 * '/auth/user/:id/notifications'
 */
router.put(
  '/user/:id/notifications',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const { notification } = req.body;
    const response = await userService.updateNotifications(userId, notification);
    if (!response) {
      const error: IErrorObject = { type: 'Not found', message: 'could not update that user.' };
      res.status(404).json(error);
    } else {
      const data: IAuthPropReturn = { notifications: response };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

/**
 * ----------
 * DELETE NOTIFICATION
 * ----------
 * @method 'DELETE'
 * '/auth/user/:id/notifications'
 */
router.delete(
  '/user/:id/notifications',
  [authMiddleware.accessMiddleware, authMiddleware.refreshMiddleware],
  async (req: IDataRequest, res: Response) => {
    const { id: userId } = req.params;
    const { notification } = req.body;
    const response = await userService.deleteNotification(userId, notification);
    if (!response) {
      const error: IErrorObject = { type: 'Not found', message: 'could not update that user.' };
      res.status(404).json(error);
    } else {
      const data: IAuthPropReturn = { notifications: response };
      auth.sendAuthResponse(req, res, data);
    }
  }
);

export default router;
