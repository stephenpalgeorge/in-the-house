import { goodbyeEmail } from './goodbye.template';
import { newApiKeyEmail } from './new-api-key.template';
import { passwordChangeEmail } from './password-change.template';
import { projectDeleteEmail } from './project-delete.template';
import { verifyEmail } from './verify-email.template';
import { welcomeEmail } from './welcome.template';

export default {
  goodbyeEmail: goodbyeEmail,
  'new-api-key': newApiKeyEmail,
  'password-change': passwordChangeEmail,
  'project-delete': projectDeleteEmail,
  verify: verifyEmail,
  welcome: welcomeEmail,
}
