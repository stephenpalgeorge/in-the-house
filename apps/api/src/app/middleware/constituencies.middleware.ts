import { Request, Response, NextFunction } from 'express';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';
import { mpService as mp } from '../services';

// ----------
// MIDDLEWARE
// ----------
// handle some common exceptions - make sure constituency names with accents are properly
// encoded.
export default async function constituenciesMiddleware(req: Request, res: Response, next: NextFunction) {
  if (/ynys/i.test(req.url)) {
    // handle exception
    const MP: MemberServiceReturn = await mp.default('constituency', 'ynys%20m%c3%b4n');
    return MP === undefined ? res.status(404).json({
      type: 'ERROR',
      message: `could not find constituency for search: ${req.url}`,
    }) : res.status(200).json(MP);
  } else next();
}