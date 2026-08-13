import type {
  GoogleFormMember,
  ImportValidationError,
} from "@/types/member-import";

import { isValidRank } from "@/utils/department-mapper";

export interface ExistingMemberValidationOptions {
  existingDiscordIds?: string[];
  existingMemberNames?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: ImportValidationError[];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function isValidDiscordId(discordId: string): boolean {
  return /^\d{17,20}$/.test(discordId.trim());
}

function isValidJoinDate(joinDate: string | null): boolean {
  if (!joinDate || joinDate.trim() === "") {
    return true;
  }

  return !Number.isNaN(Date.parse(joinDate));
}

export function validateImportMember(
  member: GoogleFormMember,
  options: ExistingMemberValidationOptions = {},
): ValidationResult {
  const errors: ImportValidationError[] = [];

  const existingDiscordIds = new Set(
    (options.existingDiscordIds ?? []).map(normalize),
  );

  const existingMemberNames = new Set(
    (options.existingMemberNames ?? []).map(normalize),
  );

  if (!member.fullName.trim()) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "MISSING_FULL_NAME",
      message: "Character Name is required.",
    });
  }

  if (!member.discordUsername.trim()) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "MISSING_DISCORD_USERNAME",
      message: "Discord Username is required.",
    });
  }

  if (!member.discordId.trim()) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "MISSING_DISCORD_ID",
      message: "Discord ID is required.",
    });
  } else if (!isValidDiscordId(member.discordId)) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "INVALID_DISCORD_ID",
      message: "Discord ID must be a valid Discord Snowflake.",
    });
  }

  if (!member.rank.trim() || !isValidRank(member.rank)) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "INVALID_RANK",
      message: `Unknown rank: ${member.rank}`,
    });
  }

  if (!isValidJoinDate(member.joinDate)) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "INVALID_JOIN_DATE",
      message: "Join Date is invalid.",
    });
  }

  if (
    member.fullName &&
    existingMemberNames.has(normalize(member.fullName))
  ) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "DUPLICATE_MEMBER",
      message: "Member already exists.",
    });
  }

  if (
    member.discordId &&
    existingDiscordIds.has(normalize(member.discordId))
  ) {
    errors.push({
      rowNumber: member.rowNumber,
      type: "DUPLICATE_DISCORD_ID",
      message: "Discord ID already exists.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateImportMembers(
  members: GoogleFormMember[],
  options: ExistingMemberValidationOptions = {},
): ValidationResult[] {
  const results: ValidationResult[] = [];

  const importedDiscordIds = new Set<string>();
  const importedNames = new Set<string>();

  for (const member of members) {
    const result = validateImportMember(member, {
      existingDiscordIds: [
        ...(options.existingDiscordIds ?? []),
        ...Array.from(importedDiscordIds),
      ],
      existingMemberNames: [
        ...(options.existingMemberNames ?? []),
        ...Array.from(importedNames),
      ],
    });

    results.push(result);

    if (result.valid) {
      importedDiscordIds.add(normalize(member.discordId));
      importedNames.add(normalize(member.fullName));
    }
  }

  return results;
}