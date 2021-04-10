import { Request, Response, NextFunction } from 'express';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';
import { mpService as mp } from '../services';

// ----------
// MIDDLEWARE
// ----------
// handle some common exceptions - make sure constituency names with accents are properly
// encoded.
export default async function namesMiddleware(req: Request, res: Response, next: NextFunction) {
  if (/coffey/i.test(req.url)) {
    const MP: MemberServiceReturn = await mp.default('name', 'dr%20Th%C3%A9r%C3%A8se%20coffey');
    MP === undefined ? res.status(404).json({
      type: 'ERROR',
      message: `could not find anyone for name: ${req.url}`,
    }) : res.status(200).json(MP);
  } else if (/begley/i.test(req.url)) {
    const MP: MemberServiceReturn = await mp.default('name', '%C3%93rfhlaith%20begley');
    return MP === undefined ? res.status(404).json({
      type: 'ERROR',
      message: `could not find anyone for name: ${req.url}`
    }) : res.status(200).json(MP);
  } else next();
}