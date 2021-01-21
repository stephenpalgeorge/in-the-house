import { User } from '../models';
import { IBasicResponse, IUser } from '@in-the-house/api-interfaces';

/**
 * CREATE USER
 * ----------
 * Add a new User document to the users collection in the DB.
 * @param email {String} a valid email address
 * @param password {String} text that is at least 8 characters long
 * @param username {String} text will be the display name for the user
 * 
 */
export async function createUser(email: string, password: string, username: string): Promise<IBasicResponse> {
  try {
    // check that the email isn't already in use/associated with the account:
    const user: IUser = await User.findOne({ email }).exec();
    if (user) return { status: 'error', payload: 'this email address already has an account.' };
    // create new user:
    const newUser: IUser = new User({ email, password, username });
    await newUser.save();
    return { status: 'success', payload: newUser.id };
  } catch (err) {
    return { status: 'error', payload: err };
  }
}

/**
 * FETCH USER
 * ----------
 * Query the database for an individual document, filtered by ID.
 * @param userId {String} the unique identifier for a user
 * 
 */
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
