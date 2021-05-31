import { EmailAccount, EmailSender, IEmailTemplate, ITemplateFuncSignature } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function goodbyeEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user } = info;
  return {
    account: EmailAccount.hello,
    sender: EmailSender.hello,
    subject: "We're sorry to see you go.",
    contents: template('Goodbye', `
      <h1>Goodbye, ${user.username}</h1>
      <p>Your account has successfully been deleted. We're sorry to see you go, but we hope you got what you needed from the In the House API.</p>
      <p>Don't be a stranger, and have a wonderful day.</p>
    `),
  }
}
