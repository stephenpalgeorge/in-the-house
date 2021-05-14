import { IApiRequest, IErrorObject, IRecord, IUser } from '@in-the-house/api-interfaces';
import { NextFunction, Response } from 'express';
import { renameSync } from 'node:fs';
import { User } from '../models';

/**
 * KEY MIDDLEWARE
 * ----------
 * This middleware expects to find an api-key and a project id in the headers of 
 * every request. It then uses these values to determine that this request and project are
 * associated with the same user account, and that the request path matches the project's
 * origin. If any of these conditions are not met, an error will be sent back to the client.
 * 
 * @param req {Request} the express Request object
 * @param res {Response} the express Response object
 * @param next {NextFunction} the express next function, that forwards the request to
 * the next middleware.
 */
export async function keyMiddleware(req: IApiRequest, res: Response, next: NextFunction) {
  const apiKey: string = req.header('api-key');
  const projectId: string = req.header('project-id');
  // if either of the required headers aren't set on the request object, return an error:
  if (!apiKey || !projectId) {
    const error: IErrorObject = { type: 'Bad request', message: 'missing required headers.' };
    res.status(400).json(error);
  } else {
    // we have the headers
    // first check that we can find a user with the given api key. If no user, return an error:
    const user: IUser = await User.findOne({ api_key: apiKey });
    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: 'no user found with that API key...' };
      res.status(404).json(error);
    } else {
      // user found
      // check that the project id provided in the headers is included in the user's projects:
      const projectIndex: number = user.projects.map(p => p.id).indexOf(projectId);
      if (projectIndex === -1) {
        const error: IErrorObject = { type: 'Not found', message: 'That project does not belong to that user...' };
        res.status(404).json(error);
      } else {
        // everything checks out:
        // we can go to next with a userId on the req
        req.userId = user.id;
        next();
      }
    }
  }
}

/**
 * USAGE MIDDLEWARE
 * ----------
 * This middleware is used to keep track of the user's usage of the API on every
 * request to any api endpoint. As well as counting the requests (and some associated data),
 * the middleware will verify that a user's has not exceeded the number of requests afforded
 * them by their account type. This middleware will also error if the user is not verified.
 * 
 * @param req {Request} the express Request object
 * @param res {Response} the express Response object
 * @param next {NextFunction} the express next function, that forwards the request to
 * the next middleware.
 */
export async function usageMiddleware(req: IApiRequest, res: Response, next: NextFunction) {
  if (!req.userId) {
    const error: IErrorObject = { type: 'Unauthorized', message: 'no user identified for this request...' };
    res.status(403).json(error);
  } else {
    // get user and push a new record into the usage array
    const user: IUser = await User.findById(req.userId);
    if (!user) {
      const error: IErrorObject = { type: 'Not found', message: 'could not find a user for this request...' };
      res.status(404).json(error);
    } else {
      // error if user is not verified:
      if (!user.verified) {
        const error: IErrorObject = { type: 'Unauthorized', message: 'could not complete the request as this user\'s account has not been verified.' };
        res.status(403).json(error);
      }
      // collect usage for the current month:
      const currentPeriodUsage: IRecord[] = user.usage.filter(record => {
        const today = new Date();
        const month: number = today.getMonth();
        const year: number = today.getFullYear();
        return record.month === month && record.year === year && record.project === req.header('project-id');
      });
      // handle usage count:
      user.usage_count++;

      // check usage for the current month doesn't exceed the quota allowed by the user's account type:
      const tier: number = user.account_type[0];
      if (
        (tier === 0 && currentPeriodUsage.length >= 250) ||
        (tier === 1 && currentPeriodUsage.length >= 20000)
      ) {
        const error: IErrorObject = { type: 'Too many requests', message: 'You have exceeded the number of requests allowed by your account type.' }
        res.status(429).json(error);
      } else {
        // add new record to the usage array:
        const now = new Date();
        user.usage.push({
          year: now.getFullYear(),
          month: now.getMonth(),
          day: now.getDate(),
          endpoint: req.originalUrl,
          project: req.header('project-id'),
        });
        await user.save();
        next();
      };
    }
  }
}
