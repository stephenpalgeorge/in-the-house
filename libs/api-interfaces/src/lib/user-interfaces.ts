import { Request } from 'express';
import { Document } from 'mongoose';

export interface IProduct {
  name: string,
  origin: string,
  id: string,
}

export interface IRecord {
  month: string,
  count: number,
}

export interface IUser extends Document {
  created_at?: number,
  email: string,
  username: string,
  password: string,
  tokenId: string,
  api_key?: string,
  projects?: IProduct[],
  usage?: IRecord[],
  encryptPassword(pw: string): string,
  comparePassword(pw: string): boolean,
}

export interface IErrorObject {
  type: string,
  message: string,
}

export interface IAuthToken {
  userId: string,
  iat: number,
  exp: number,
  tokenId?: string,
}

export interface IDataRequest extends Request {
  accessToken?: string,
  refreshToken?: string,
  userId?: string,
  tokenId?: string,
}

export interface IAuthRouteReturn {
  user: IUser,
  accessToken?: string,
}

// if 'success', the payload will be the user,
// if 'error', the payload will be a message
export interface IBasicResponse {
  status: 'success'|'error',
  payload: string,
}