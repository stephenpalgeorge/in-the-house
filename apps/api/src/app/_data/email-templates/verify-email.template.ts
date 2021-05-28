import { EmailAccount, EmailSender, IEmailTemplate, ITemplateFuncSignature } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function verifyEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user } = info;

  return {
    account: EmailAccount.admin,
    sender: EmailSender.admin,
    subject: "Verify your email address",
    contents: template('Verify your email address', `
      <h1>Hi, ${user.firstname && user.firstname.length > 0 ? user.firstname : user.username}</h1>
      <p>You'll need to verify your account before you can use the API. Just click on this link and you'll be all set:</p>
      <a target="_blank" href="https://inthehouse.dev/verify?id=${user.id}&hash=${user.verification_hash}">Verify your account.</a>
    `),
  }
}