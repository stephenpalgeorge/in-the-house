import { EmailAccount, EmailSender, ITemplateFuncSignature, IEmailTemplate } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function newApiKeyEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user } = info;

  return {
    account: EmailAccount.admin,
    sender: EmailSender.admin,
    subject: "New API Key",
    contents: template('New API Key', `
      <h1>Hi ${user.firstname && user.firstname.length > 0 ? user.firstname : user.username}</h1>
      <p>We're just letting you know that a new API Key has just been generated on your account. You'll need to update any references to it that you have in code or other apps.</p>
      <p>If you didn't do this, you might like to <a target="_blank" href="https://inthehouse.dev/login">login</a>, update your password and generate a new API Key, just incase it has been compromised!</p>
      <p id="sign-off">Have an excellent day</p>
    `),
  }
}
