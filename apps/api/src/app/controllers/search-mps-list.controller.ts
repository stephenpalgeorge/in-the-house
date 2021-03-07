import { Response } from "express";
import { mpService as mp } from '../services';
import { MemberResponse, MemberServiceReturn } from '@in-the-house/api-interfaces';

export default async function searchmpsList(searchInputs: string[], res: Response): Promise<Response> {
  let members: MemberResponse[] = [];
  for (const term of searchInputs) {
    const member: MemberServiceReturn = await mp.default('name', term, '*');
    if (member === undefined) return res.status(404).json({
      type: 'ERROR',
      message: `could not find any MPs for search term: ${term}`,
    });
    if (member && Array.isArray(member)) {
      members = [...members, ...member];
    }
  }

  return res.status(200).json(members);
}