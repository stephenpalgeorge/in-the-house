import * as nodemailer from 'nodemailer';
import { EmailTemplates, IEmailTemplate, IUser } from "@in-the-house/api-interfaces";

import templates from '../_data/email-templates';

const admin_transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL_USER,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

const hello_transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.HELLO_EMAIL_USER,
    pass: process.env.HELLO_EMAIL_PASSWORD,
  },
});

const support_transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SUPPORT_EMAIL_USER,
    pass: process.env.SUPPORT_EMAIL_PASSWORD,
  },
});

const transporters = {
  admin: admin_transporter,
  hello: hello_transporter,
  support: support_transporter,
};

export function sendMail(template: EmailTemplates, user: IUser, data = {}) {
  const email: IEmailTemplate = templates[template](user, data);
  const transporter = transporters[email.account];
  const mailOptions = {
    from: email.sender,
    to: user.email,
    subject: email.subject,
    html: email.contents,
  }

  transporter.sendMail(mailOptions);
}
