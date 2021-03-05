export interface Info {
  house: number,
  name: string,
  id: number,
  startDate: string,
  endDate: string | null,
  additionalInfo: string | null,
  additionalInfoLink: string | null
}

export interface MemberBio {
  governmentPosts: Info[],
  oppositionPosts: Info[],
  otherPosts: Info[],
  committeeMemberships: Info[],
}

export interface MemberFocus {
  category: string,
  focus: string[],
}

export interface Party {
  id: number,
  name: string,
  abbreviation: string,
  backgroundColour: string,
  foregroundColour: string,
  isLordsMainParty: boolean,
  isLordsSpiritualParty: boolean,
  governmentType: number,
  isIndependentParty: boolean,
}

export interface Status {
  statusIsActive: boolean,
  statusDescription: string,
  statusNotes: string | null,
  statusId: number,
  statusStartDate: string,
}

export interface HouseMembership {
  membershipFrom: string,
  membershipFromId: number,
  house: number,
  membershipStartDate: string,
  membershipEndDate: string | null,
  membershipEndReason: string | null,
  membershipEndReasonNotes: string | null,
  membershipEndReasonId: string | null,
  membershipStatus: Status,
}

export interface Member {
  id: number,
  nameListAs: string,
  nameDisplayAs: string,
  nameFullTitle: string,
  nameAddressAs: string,
  latestParty: Party,
  gender: 'M'|'F',
  latestHouseMembership: HouseMembership,
  thumbnailUrl: string,
}

export interface MemberContact {
  type: string,
  typeDescription: string,
  typeId: number,
  isPreferred: boolean,
  isWebAddress: boolean,
  line1: string,
  email?: string,
}

export interface MemberResponse extends Member {
  portraitUrl: string,
  partyColor: string,
  Bio: MemberBio,
  Contact: MemberContact[],
  Focus: MemberFocus[],
  Synopsis: string,
}

export type MemberServiceReturn = MemberResponse|MemberResponse[]|undefined;