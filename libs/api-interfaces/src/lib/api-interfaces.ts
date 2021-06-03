import { Request } from 'express';
import { IUser } from './user-interfaces';

export interface IApiRequest extends Request {
  userId?: string,
}

export enum EmailSender {
  admin = 'admin@inthehouse.dev',
  hello = 'hello@inthehouse.dev',
  support = 'support@inthehouse.dev',
}

export enum EmailTemplates {
  goodbye = 'goodbye',
  newApiKey = 'new-api-key',
  passwordChange = 'password-change',
  projectDelete = 'project-delete',
  verify = 'verify',
  welcome = 'welcome',
}

export interface IEmailTemplate {
  sender: EmailSender,
  subject: string,
  contents: string,
}

export interface IEmailData {
  projectName?: string,
}

export interface ITemplateFuncSignature {
  user: IUser,
  data?: IEmailData,
}

export interface IVerifyURLParams {
  id?: string,
  hash?: string,
}