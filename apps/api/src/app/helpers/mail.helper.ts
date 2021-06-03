import * as sendgrid from '@sendgrid/mail';
import { EmailTemplates, IEmailTemplate, IUser } from "@in-the-house/api-interfaces";

import templates from '../_data/email-templates';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
export async function send(template: EmailTemplates, user: IUser, data = {}) {
  try {
    const email: IEmailTemplate = templates[template]({ user, data });
    const msg = {
      to: user.email,
      from: email.sender,
      subject: email.subject,
      html: email.contents,
    };
    await sendgrid.send(msg);
  } catch (err) {
    console.error(err);
  }
};
