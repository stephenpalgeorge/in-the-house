import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { IUser } from '@in-the-house/api-interfaces';

const userSchema: Schema = new Schema({
  // see account_type definitions at the bottom of this file
  account_type: { type: Array, default: [0, 0] },
  created_at: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  api_key: { type: String, default: '' },
  projects: { type: Array, default: [] },
  usage: { type: Array, default: [] },
  usage_count: { type: Number, default: 0 },
});

// ----------
// METHODS
// ----------
userSchema.methods.encryptPassword = async function (pw: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pw, salt);
    return password;
  } catch (err) {
    console.error(err);
  }
}

userSchema.methods.comparePassword = async function (this: IUser, pw: string): Promise<boolean> {
  try {
    const correctPassword: boolean = await bcrypt.compare(pw, this.password);
    return correctPassword;
  } catch (err) {
    console.error(err);
  }
}

// ----------
// MIDDLEWARE
// ----------
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  // the above guard clause means the following code only executes if the password is being changed
  const hashedPassword: string = await this.encryptPassword(this.password);
  this.password = hashedPassword;
  next();
  return this;
})


const User = model<IUser>('user', userSchema);
export default User;

/**
 * ACCOUNT TYPES
 * ----------
 * The user's account type is represented by 2 numbers in an array: [tier, billable?];
 *   - tier:
 *     - 0: "limited account". Intended for development purposes only, this account type limits
 *         the user to only 1 project, a maximum of 250 requests/month.
 *     - 1: "standard account". This account type allows up to 3 projects, 20,000 requests/month and
 *         access to all results on all endpoints.
 *     - 2: "unlimited account". This account type allows unlimited projects, unlimited requests/month
 *         and access to all results on all endpoints.
 *
 *   - billable:
 *     - 0: this account should not be charged.
 *     - 1: this account should be charged monthly.
 *
 * The reason for this 2 number system is it allows the flexibility to grant user's an 'unlimited' account,
 * for example, without them having to pay. We might allow this for charities, or sponsoring organisations.
 */