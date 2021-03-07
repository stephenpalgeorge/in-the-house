import { Response } from 'express';
import { mpService as mp } from '../services';
import { MemberServiceReturn } from '@in-the-house/api-interfaces';

export default async function searchmps(searchInput: string, res: Response): Promise<Response> {
  let data: MemberServiceReturn = await mp.default('name', searchInput, '*');
  return data === undefined ? res.status(400).json({
    type: 'ERROR',
    message: `couldn\'t find anyone for search term ${searchInput}`,
  }) : res.status(200).json(data);
}