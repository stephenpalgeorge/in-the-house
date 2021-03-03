import { Request } from 'express';

export interface IApiRequest extends Request {
  userId?: string,
}