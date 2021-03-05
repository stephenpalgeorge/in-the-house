import axios from 'axios';
import { Info, Member, MemberBio, MemberFocus } from '@in-the-house/api-interfaces';

/**
 * GET MP BIO DETAILS
 * ----------
 * 
 */
interface BioReturnValue {
  value: {
    representations: Info[]
    electionsContested: any[],
    houseMemberships: Info[],
    governmentPosts: Info[],
    oppositionPosts: Info[],
    otherPosts: Info[],
    partyAffiliations: Info[],
    committeeMemberships: Info[],
  },
  links: any[],
}

export async function getMpBioDetails(id: string): Promise<MemberBio> {
  const { data }: { data: BioReturnValue } = await axios.get(`https://members-api.parliament.uk/api/Members/${id}/Biography`);
  return {
    governmentPosts: data.value.governmentPosts,
    oppositionPosts: data.value.oppositionPosts,
    otherPosts: data.value.otherPosts,
    committeeMemberships: data.value.committeeMemberships,
  };
}

/**
 * GET MP CONTACT DETAILS
 * ----------
 * This function looks at the MPs contact page and
 * scrapes as much data as possible before handing it
 * back off to the scrapeMp function.
 * 
 * @param {String} id - the url of the MPs contact page.
 */
export async function getMpContactDetails(id: string): Promise<any> {
  const { data } = await axios.get(`https://members-api.parliament.uk/api/Members/${id}/Contact`);
  return data.value;
}

/**
 * GET MP FOCUS DETAILS
 * ----------
 * 
 */
interface FocusResponseValue {
  value: MemberFocus[],
  links: any[],
}

export async function getMpFocusDetails(id: string): Promise<MemberFocus[]> {
  const { data }: { data: FocusResponseValue } = await axios.get(`https://members-api.parliament.uk/api/Members/${id}/Focus`)
  return data.value;
}

/**
 * GET MP OBJECT
 * ----------
 * @param mp_id {String}
 */
export async function getMpObject(mp_id: string): Promise<Member> {
  const { data } = await axios.get(`https://members-api.parliament.uk/api/Members/${mp_id}`);
  return data.value;
}

/**
 * GET MP SYNOPSIS
 * ----------
 * @param id {String}
 */
export async function getMpSynopsis(id: string): Promise<string> {
  const { data } = await axios.get(`https://members-api.parliament.uk/api/Members/${id}/Synopsis`);
  return data.value;
}
