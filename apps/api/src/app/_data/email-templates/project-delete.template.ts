import { EmailSender, ITemplateFuncSignature, IEmailTemplate } from '@in-the-house/api-interfaces';
import template from './emailTemplate';

export function projectDeleteEmail(info: ITemplateFuncSignature): IEmailTemplate {
  const { user, data } = info;

  return {
    sender: EmailSender.admin,
    subject: "Project deleted",
    contents: template('Project deleted', `
      <h1>Hi, ${user.firstname && user.firstname.length > 0 ? user.firstname : user.username}</h1>
      <p>We're just letting you know that your project "${data.projectName}" has been deleted. That means you won't be able to query the In the House API from that domain anymore. If this was done in error, you'll need to create a new project of that name and then update any references you have in code with your new project ID.</p>
      <p id="sign-off">Have a great day.</p>
    `),
  }
}