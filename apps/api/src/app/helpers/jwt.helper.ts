import * as jwt from 'jsonwebtoken';
import { IBasicResponse } from '@in-the-house/api-interfaces';

export function signAccessToken(userId: string): IBasicResponse {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) throw 'Required environment variable is not defined';
    const token: string = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
    return { status: 'success', payload: token };
  } catch (err) {
    return { status: 'error', payload: err };
  }
}

export function signRefreshToken(userId: string): IBasicResponse {
  try {
    if (!process.env.REFRESH_TOKEN_SECRET) throw 'Required environment variable is not defined';
    const token: string = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });
    return { status: 'success', payload: token };
  } catch (err) {
    return { status: 'error', payload: err }
  }
}

export function signTokens(userId: string): [string|undefined, string|undefined] {
  try {
    const accessToken: IBasicResponse = signAccessToken(userId);
    if (accessToken.status === 'error') throw 'could not sign access token...';
    
    const refreshToken: IBasicResponse = signRefreshToken(userId);
    if (refreshToken.status === 'error') throw 'could not sign refresh token...';

    return [accessToken.payload, refreshToken.payload];
  } catch (err) {
    console.error(err);
    return [undefined, undefined];
  }
}