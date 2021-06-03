import { EmailAccount, EmailSender, IEmailTemplate, ITemplateFuncSignature } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function passwordChangeEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user } = info;

  return {
    account: EmailAccount.admin,
    sender: EmailSender.admin,
    subject: "Your password has been changed",
    contents: template('New Password', `
      <h1>Hi, ${user.firstname && user.firstname.length > 0 ? user.firstname : user.username}</h1>
      <p>Your password has just been updated.</p>
      <p>If you didn't do this then you should probably <a target="_blank" href="https://inthehouse.dev/login">login</a> and change it again to make sure it's safe! You may also like to take the opportunity to update your API key, just incase someone nefarious has got their hands on it...</p>
      <p id="sign-off">Have a wonderful day</p>
    `),
  }
}