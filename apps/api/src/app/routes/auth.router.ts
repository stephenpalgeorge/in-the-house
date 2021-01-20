import { Request, Router, Response } from 'express';
import { authMiddleware } from '../middleware';
import { userService } from '../services';
import { IAuthRouteReturn, IDataRequest, IErrorObject } from '@in-the-house/api-interfaces';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Auth routes are used for creating, managing and accessing user accounts.');
});

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
