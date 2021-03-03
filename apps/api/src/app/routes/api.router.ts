import { Response, Request, Router } from 'express';

import { apiMiddleware } from '../middleware';

const router = Router();

router.get(
  '/test',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware],
  async (req: Request, res: Response) => {
    res.json({ message: 'testing the api routes and middleware' });
  }
);

export default router;
