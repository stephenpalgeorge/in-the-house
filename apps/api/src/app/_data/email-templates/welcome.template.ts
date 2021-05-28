import { EmailAccount, EmailSender, IEmailTemplate, ITemplateFuncSignature } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function welcomeEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user } = info;
  return {
    account: EmailAccount.hello,
    sender: EmailSender.hello,
    subject: "Welcome, you're In the House.",
    contents: template('Welcome', `
      <h1>Welcome, ${user.username}</h1>
      <p>Thanks so much for signing up to the In the House API - we hope it helps you build something awesome!</p>
      <p>Get started by <a target="_blank" href="https://inthehouse.dev/login">logging in to your account</a>. You'll find your API Keys under the "API & Project Keys" submenu item, which you'll need in order to authenticate the requests you send along to the API. Let us know what you create by <a target="_blank" href="https://twitter.com/house_api">tagging us on twitter</p>
      <p>For more information and examples about how to use the API, and everything it has to offer you, please <a target="_blank" href="https://inthehouse.dev/docs">read the docs.</a></p>
      <p>Have a wonderful day!</p>
    `),
  }
}
