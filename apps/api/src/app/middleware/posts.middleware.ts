import { Request, Response, NextFunction } from 'express';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';
import { mpService as mp } from '../services';

// ----------
// MIDDLEWARE
// ----------
// catch some common exceptions. E.g. people would naturally search
// for 'prime minister' under /posts/single/... but this does not match
// with the government API, so we catch this request and handle
// it separately:
export default async function postsMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url.toLowerCase() === '/single/prime%20minister') {
    const data: MemberServiceReturn = await mp.default('layingministername', 'the%20prime%20minister');
    if (data === undefined) return res.status(404).json({
      type: 'ERROR',
      message: 'Could not find anything for that url...',
    });

    return res.status(200).json(data);
  } else next();
}