import { mpService as mp } from '../services';
import { MemberResponse, MemberServiceReturn } from '@in-the-house/api-interfaces';

export default async function searchmpsList(searchInputs: string[]): Promise<[string[], any[]]> {
  let members: MemberResponse[] = [];
  const errors: string[] = [];
  for (const term of searchInputs) {
    const member: MemberServiceReturn = await mp.default('name', term, '*');
    if (member === undefined) errors.push(term);
    if (member && Array.isArray(member)) {
      members = [...members, ...member];
    }
  }

  return [errors, members];
}