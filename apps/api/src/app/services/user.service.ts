import { User } from '../models';
import { tokens } from '../helpers';
import { IBasicResponse, ILoginResponse, IUser } from '@in-the-house/api-interfaces';

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

export async function authenticate(username, password): Promise<ILoginResponse> {
  try {
    // find user by username, error if no document is found:
    const user: IUser = await User.findOne({ username }).exec();
    if (!user) throw `No user exists for user: ${username}`;

    // validate password
    const isValidPassword: boolean = user.comparePassword(password);
    if (!isValidPassword) throw 'Password is incorrect...';

    // sign tokens and return user, accessToken, refreshToken
    const [accessToken, refreshToken] = tokens.signTokens(user.id);
    return {
      message: 'successfully created user',
      userId: user.id,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    return {
      message: err,
      userId: undefined,
      accessToken: undefined,
      refreshToken: undefined,
    };
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
  user.projects = [];
  return user;
}
