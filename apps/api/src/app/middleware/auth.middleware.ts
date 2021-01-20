import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { IAuthToken, IDataRequest, IErrorObject } from '@in-the-house/api-interfaces';

import { tokens } from '../helpers';

export async function accessMiddleware(req: IDataRequest, res: Response, next: NextFunction) {
  try {
    const accessToken: string|undefined = req.headers.authorization?.split('Bearer ')[1];
    if (!accessToken) {
      const error: IErrorObject = { type: 'Unauthorized', message: 'Could not verify user identity' };
      res.status(401).json(error);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      const error: IErrorObject = { type: 'Internal server error', message: 'required environment variable is not defined' }
      res.status(500).json(error);
    }

    const { userId } = <IAuthToken>jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = userId;
  } catch (err) { next(); }
}

export async function refreshMiddleware(req: IDataRequest, res: Response, next: NextFunction) {
  try {
    // only check the refresh token if there is NOT a userId already on the request object.
    // The presence of the userId would mean the user has already been verified in the
    // accessMiddleware function.
    if (!req.userId) {
      // validate value of refresh token:
      const refreshTokenValue: string|string[]|undefined = req.cookies['refreshToken'];
      if (!refreshTokenValue) throw 'no refresh token was sent with the request...';
      if (Array.isArray(refreshTokenValue)) throw 'a single string should be passed to the authorization-refresh header';
      if (!process.env.REFRESH_TOKEN_SECRET) {
        const error: IErrorObject = { type: 'Internal server error', message: 'required environment variable is not defined' }
        res.status(500).json(error);
      }
  
      // verify the token and add return values
      const { userId } = <IAuthToken>jwt.verify(JSON.parse(refreshTokenValue), process.env.REFRESH_TOKEN_SECRET);
      const [accessToken, refreshToken] = await tokens.signTokens(userId);
      // set auth data on request inc. new tokens:
      req.userId = userId;
      req.accessToken = accessToken
      res.cookie('refreshToken', refreshToken, {
        // milliseconds in 10 days:
        maxAge: 864_000_000,
        httpOnly: true
      });
    } next(); // <-- proceed to the route
  } catch (err) {
    const error: IErrorObject = { type: 'Unauthorized', message: err || 'Could not verify user identity' };
    res.status(401).json(error);
  }
}
