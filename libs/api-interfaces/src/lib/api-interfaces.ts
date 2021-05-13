import { Request } from 'express';
import { IUser } from './user-interfaces';

export interface IApiRequest extends Request {
  userId?: string,
}

export enum EmailAccount {
  admin = "admin",
  hello = "hello",
  support = "support",
}

export enum EmailSender {
  admin = 'In the House <admin@inthehouse.dev>',
  hello = 'In the House <hello@inthehouse.dev>',
  support = 'In the House <support@inthehouse.dev>',
}

export enum EmailTemplates {
  newApiKey = 'new-api-key',
  passwordChange = 'password-change',
  projectDelete = 'project-delete',
  verify = 'verify',
  welcome = 'welcome',
}

export interface IEmailTemplate {
  account: EmailAccount,
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
