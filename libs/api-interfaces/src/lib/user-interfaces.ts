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

export interface IUserProfile {
  email?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
}

export interface IUser extends Document {
  account_type?: 'free'|'tier-1'|'tier-2',
  created_at?: number,
  email: string,
  username: string,
  firstname?: string,
  lastname?: string,
  password: string,
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

export interface ILoginResponse {
  message: string,
  userId: string|undefined,
  accessToken: string|undefined,
  refreshToken: string|undefined,
}