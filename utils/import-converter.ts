import type { GoogleFormMember } from "@/types/member-import";

import { getDepartmentFromRank } from "@/utils/department-mapper";

export interface MemberInsert {
  full_name: string;

  badge_number: string;

  discord_id: string;

  discord_username: string;

  rank: string;

  department: string;

  status: "Active";

  join_date: string | null;

  discord_display_name: null;

  discord_avatar: null;

  discord_banner: null;

  is_super_admin: false;
}

export interface ConvertMemberOptions {
  badgeNumber: string;
}

export function convertGoogleMemberToMemberInsert(
  googleMember: GoogleFormMember,
  options: ConvertMemberOptions,
): MemberInsert {
  return {
    full_name: googleMember.fullName.trim(),

    badge_number: options.badgeNumber,

    discord_id: googleMember.discordId.trim(),

    discord_username:
      googleMember.discordUsername.trim(),

    rank: googleMember.rank.trim(),

    department: getDepartmentFromRank(
      googleMember.rank,
    ),

    status: "Active",

    join_date:
      googleMember.joinDate &&
      googleMember.joinDate.trim() !== ""
        ? googleMember.joinDate
        : null,

    discord_display_name: null,

    discord_avatar: null,

    discord_banner: null,

    is_super_admin: false,
  };
}

export function convertGoogleMembersToMemberInsert(
  members: GoogleFormMember[],
  badgeNumbers: string[],
): MemberInsert[] {
  if (members.length !== badgeNumbers.length) {
    throw new Error(
      "Member count and badge count do not match.",
    );
  }

  return members.map((member, index) =>
    convertGoogleMemberToMemberInsert(member, {
      badgeNumber: badgeNumbers[index],
    }),
  );
}