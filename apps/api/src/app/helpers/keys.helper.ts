import * as crypto from 'crypto';

export function generateKey(len: number = 32): string {
  return crypto.randomBytes(len).toString('hex');
}
