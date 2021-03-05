import axios from 'axios';
import {
  Member,
  MemberBio,
  MemberContact,
  MemberFocus,
  MemberResponse,
  MemberServiceReturn,
} from '@in-the-house/api-interfaces';

import { party_colours } from '../_data/party_colours';
import { mp } from '../helpers';

async function getMp(id: string): Promise<MemberResponse> {
  const mp_data: Member = await mp.getMpObject(id);
  const mp_contact_data: MemberContact[] = await mp.getMpContactDetails(id);
  const mp_bio_data: MemberBio = await mp.getMpBioDetails(id);
  const mp_focus_data: MemberFocus[] = await mp.getMpFocusDetails(id);
  const mp_synopsis: string = await mp.getMpSynopsis(id);

  const partyColorObject = party_colours.filter(pc => {
    if (pc.id === mp_data.latestParty.id) return pc.color
  });

  return {
    ...mp_data,
    partyColor: partyColorObject[0].colour,
    portraitUrl: `https://members-api.parliament.uk/api/Members/${id}/Portrait`,
    Bio: mp_bio_data,
    Contact: mp_contact_data,
    Focus: mp_focus_data,
    Synopsis: mp_synopsis,
  };
}

export default async function mpService(param: string, value: string, operator: string = '='): Promise<MemberServiceReturn> {
  try {
    const queryURL = `https://data.parliament.uk/membersdataplatform/services/mnis/members/query/${param}${operator}${value}/`;
    const { data } = await axios.get(queryURL);
    if (operator === '=') {
      if (data.Members !== null) {
        const { ["@Member_Id"]: mp_id } = data.Members.Member;
        const MP = await getMp(mp_id);
        return MP;
      } else return undefined;
    } else if (operator === '*') {
      const { data } = await axios.get(queryURL);
      if (data.Members !== null) {
        const members: MemberResponse[] = [];
        if (data.Members.Member.length && data.Members.Member.length > 0) {
          for (const m of data.Members.Member) {
            const member = await getMp(m["@Member_Id"]);
            members.push(member);
          }
        } else if (data.Members.Member && Object.keys(data.Members.Member).length > 0) {
          const member = await getMp(data.Members.Member["@Member_Id"]);
          members.push(member);
        }
        return members;
      } else return undefined;
    }
  } catch (err) {
    console.error(err);
  }
}
