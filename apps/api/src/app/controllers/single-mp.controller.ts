import { mpService as mp } from '../services';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';

export default async function singlemp(searchTerm: string, param: String): Promise<MemberServiceReturn | undefined> {
  // value should arrive in this format anyway, but we make sure
  // that spaces are properly encoded for the request url.
  const encodedParam: string = param.split(' ').join('%20');
  let data: MemberServiceReturn | undefined = await mp.default(searchTerm, encodedParam);
  return data;
}