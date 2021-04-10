import { MemberServiceReturn } from '@in-the-house/api-interfaces';
import { mpService as mp } from '../services';

export default async function listmps(searchTerm: string, param: string): Promise<[string[], any[]]> {
  // create array of names from the params:
  const paramArray: string[] = param.split('+').map(n => n.split(' ').join('%20'));
  // warn a user about correct endpoint usage:
  const errors: string[] = [];
  // construct array for the response:
  const output: any[] = [];
  for (const item of paramArray) {
    const data: MemberServiceReturn = await mp.default(searchTerm, item);
    if (data === undefined) errors.push(item.split('%20').join(' '))
    else {
      output.push({
        [searchTerm]: item.split('%20').join(' ').toUpperCase(),
        MP: data
      });
    }
  }

  return [errors, output];
}