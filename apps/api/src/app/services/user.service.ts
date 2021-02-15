import { User } from '../models';
import { tokens } from '../helpers';
import { IBasicResponse, ILoginResponse, IUser, IUserProfile } from '@in-the-house/api-interfaces';

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
    const isValidPassword: boolean = await user.comparePassword(password);
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
  try {
    const user: IUser = await User.findById(userId);
    if (!user) return undefined;
    // clean user data so sensitive stuff isn't returned:
    user.password = "";
    user.api_key = "";
    user.projects = [];
    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

/**
 * UPDATE USER
 * ----------
 * Query the database for an individual document, filtered by ID,
 * and update it, return the new (updated) user document.
 * @param userId {String} the unique identifier for the user that should be updated
 * @param updates {Object} the updates that should be applied to the user
 * 
 */
export async function updateUserProfile(userId: string, updates: IUserProfile): Promise<IUser|undefined> {
  try {
    const user: IUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) return undefined;
    // clean user data so sensitive stuff isn't returned:
    user.password = "";
    user.api_key = "";
    user.projects = [];
    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

/**
 * UPDATE USER PASSWORD
 * ----------
 * Query the database for an individual document, filtered by ID,
 * and update the 'password' for it, having verified their current password.
 * Return the document, do not need to set { new: true } as the only thing that will
 * change is the password, and we never send the password in the response anyway.
 * @param userId {String} the unique identifier for the usec that should be updated
 * @param updates {Object} an object that must contait the user's current password, and their new password.
 */
export async function updateUserPassword(userId: string, updates: {current: string, new: string}): Promise<IUser|undefined> {
  try {
    // validate the user's current password.
    const user: IUser = await User.findById(userId);
    if (!user) return undefined;
    const isValidPassword: boolean = await user.comparePassword(updates.current);
    if (!isValidPassword) return undefined;
    // if ok, update the user document with the hashed version of their new password
    user.password = updates.new;
    // save the document and return the user
    user.save();
    user.password = "";
    user.api_key = "";
    user.projects = [];
    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
