import { Request } from 'express';
import { Document } from 'mongoose';

export interface IProject {
  origin: string,
  id: string,
}

export interface IRecord {
  year: number,
  // month is a number from 0 - 11:
  month: number,
  // day is a number from 1 - 31:
  day: number,
  endpoint: string,
  // the id of one of the user's projects:
  project: string,
}

export interface IUserProfile {
  email?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
}

export interface IUser extends Document {
  account_type?: [number, number],
  created_at?: number,
  email: string,
  username: string,
  firstname?: string,
  lastname?: string,
  password: string,
  api_key?: string,
  projects?: IProject[],
  notifications?: string[],
  usage?: IRecord[],
  usage_count?: number,
  verification_hash: string,
  verified: boolean,
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

export interface IAuthPropReturn {
  apiKey?: string,
  accessToken?: string,
  projects?: IProject[],
  id?: string,
  notifications?: string[],
}

// if 'success', the payload will be the user,
// if 'error', the payload will be a message
export interface IBasicResponse {
  status: 'success' | 'error',
  payload: string,
  context?: IUser,
}

export interface ILoginResponse {
  message: string,
  userId: string | undefined,
  accessToken: string | undefined,
  refreshToken: string | undefined,
}

export interface IDeleteProjectResponse {
  projects: IProject[],
  user: IUser,
  targetProject: string,
}