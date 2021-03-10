import { mpService as mp } from '../services';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';

export default async function searchmps(searchInput: string): Promise<MemberServiceReturn | undefined> {
  return await mp.default('name', searchInput, '*');
}
