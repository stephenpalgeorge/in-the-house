import { User } from '../models';
import { IUser } from '@in-the-house/api-interfaces';

export async function fetchUser(userId: string): Promise<IUser|undefined> {
  const user: IUser = await User.findById(userId);
  if (!user) return undefined;
  // clean user data so sensitive stuff isn't returned:
  user.password = "";
  user.api_key = "";
  user.tokenId = "";
  user.projects = [];
  return user;
}
