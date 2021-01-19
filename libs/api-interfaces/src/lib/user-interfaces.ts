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
