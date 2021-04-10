import { Response } from 'express';
import { IDataRequest } from '@in-the-house/api-interfaces';

export function sendAuthResponse(req: IDataRequest, res: Response, data, statusCode = 200) {
  if (req.accessToken) data.accessToken = req.accessToken;
  if (req.refreshToken) res.cookie('refreshToken', req.refreshToken, {
    // miliseconds in 10 days:
    maxAge: 864_000_000,
    httpOnly: true,
  });
  res.status(statusCode).json(data);
}
