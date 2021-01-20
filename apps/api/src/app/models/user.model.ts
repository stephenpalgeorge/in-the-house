import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from '@in-the-house/api-interfaces';

const userSchema: Schema = new Schema({
  created_at: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  tokenId: { type: String, default: '' },
  api_key: { type: String, default: '' },
  projects: { type: Array, default: [] },
  usage: { type: Array, default: [] },
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
userSchema.pre<IUser>('save', async function(next) {
  const hashedPassword: string = await this.encryptPassword(this.password);
  this.password = hashedPassword;
  next();
  return this;
})


const User= model<IUser>('user', userSchema);
export default User;
