import type {
  GoogleFormMember,
  ImportSummary,
  ImportValidationError,
} from "@/types/member-import";

import type { MemberInsert } from "@/types/member";

import { supabase } from "@/lib/supabase";

import {
  validateImportMembers,
} from "@/utils/import-validator";

import {
  convertGoogleMembersToMemberInsert,
} from "@/utils/import-converter";

import {
  generateNextBadge,
  getHighestBadge,
} from "@/utils/badge-generator";

const IMPORT_BATCH_SIZE = 100;

export interface MemberImportResult {
  success: boolean;

  summary: ImportSummary;

  inserted: MemberInsert[];

  validationErrors: ImportValidationError[];
}

export interface ExistingMemberLookup {
  discordIds: string[];

  memberNames: string[];

  badgeNumbers: string[];
}

export class MemberImportService {
  /**
   * Reads existing members from the database.
   * Used for duplicate detection and
   * automatic badge generation.
   */
  private async getExistingMembers(): Promise<ExistingMemberLookup> {
    const { data, error } = await supabase
      .from("members")
      .select(
        `
          full_name,
          discord_id,
          badge_number
        `,
      );

    if (error) {
      throw error;
    }

    return {
      discordIds:
        data
          ?.map((member) => member.discord_id)
          .filter(Boolean) ?? [],

      memberNames:
        data
          ?.map((member) => member.full_name)
          .filter(Boolean) ?? [],

      badgeNumbers:
        data
          ?.map((member) => member.badge_number)
          .filter(Boolean) ?? [],
    };
  }

  /**
   * Generates sequential badge numbers
   * for every imported member.
   */
  private generateBadgeNumbers(
    existingBadges: string[],
    count: number,
  ): string[] {
    const badges: string[] = [];

    let highestBadge =
      getHighestBadge(existingBadges);

    for (let index = 0; index < count; index++) {
      const nextBadge =
        generateNextBadge(highestBadge);

      badges.push(
        nextBadge.nextBadge,
      );

      highestBadge =
        nextBadge.nextBadge;
    }

    return badges;
  }

  /**
   * Creates a new empty import summary.
   */
  private createSummary(): ImportSummary {
    return {
      processed: 0,

      imported: 0,

      skipped: 0,

      duplicateMembers: 0,

      duplicateDiscordIds: 0,

      invalidRanks: 0,

      invalidDiscordIds: 0,

      invalidJoinDates: 0,

      missingFields: 0,
    };
  }
    /**
   * Updates the import summary using
   * validation errors.
   */
  private updateSummary(
    summary: ImportSummary,
    errors: ImportValidationError[],
  ): void {
    const skippedRows = new Set<number>();

    for (const error of errors) {
      skippedRows.add(error.rowNumber);

      switch (error.type) {
        case "DUPLICATE_MEMBER":
          summary.duplicateMembers++;
          break;

        case "DUPLICATE_DISCORD_ID":
          summary.duplicateDiscordIds++;
          break;

        case "INVALID_RANK":
          summary.invalidRanks++;
          break;

        case "INVALID_DISCORD_ID":
          summary.invalidDiscordIds++;
          break;

        case "INVALID_JOIN_DATE":
          summary.invalidJoinDates++;
          break;

        case "MISSING_FULL_NAME":
        case "MISSING_DISCORD_USERNAME":
        case "MISSING_DISCORD_ID":
          summary.missingFields++;
          break;
      }
    }

    summary.skipped = skippedRows.size;
  }

  /**
   * Validates imported members against
   * existing members in the database.
   */
  private validateMembers(
    members: GoogleFormMember[],
    existingMembers: ExistingMemberLookup,
  ): ImportValidationError[] {
    const validationResults =
      validateImportMembers(members, {
        existingDiscordIds:
          existingMembers.discordIds,

        existingMemberNames:
          existingMembers.memberNames,
      });

    return validationResults.flatMap(
      (result) => result.errors,
    );
  }

  /**
   * Returns only members that passed
   * validation.
   */
  private filterValidMembers(
    members: GoogleFormMember[],
    validationErrors: ImportValidationError[],
  ): GoogleFormMember[] {
    const invalidRows = new Set<number>(
      validationErrors.map(
        (error) => error.rowNumber,
      ),
    );

    return members.filter(
      (member) =>
        !invalidRows.has(
          member.rowNumber,
        ),
    );
  }

  /**
   * Converts validated Google Form
   * members into MemberInsert objects.
   */
  private prepareMembers(
    members: GoogleFormMember[],
    existingMembers: ExistingMemberLookup,
  ): MemberInsert[] {
    const badgeNumbers =
      this.generateBadgeNumbers(
        existingMembers.badgeNumbers,
        members.length,
      );

    return convertGoogleMembersToMemberInsert(
      members,
      badgeNumbers,
    );
  }
    /**
   * Inserts members into the database
   * using configurable batch sizes.
   */
  private async insertMembers(
    members: MemberInsert[],
  ): Promise<MemberInsert[]> {
    if (members.length === 0) {
      return [];
    }

    const insertedMembers: MemberInsert[] = [];

    for (
      let index = 0;
      index < members.length;
      index += IMPORT_BATCH_SIZE
    ) {
      const batch = members.slice(
        index,
        index + IMPORT_BATCH_SIZE,
      );

      const {
        data,
        error,
      } = await supabase
        .from("members")
        .insert(batch)
        .select();

      if (error) {
        throw error;
      }

      insertedMembers.push(
        ...((data ??
          []) as MemberInsert[]),
      );
    }

    return insertedMembers;
  }

  /**
   * Executes the complete import
   * pipeline.
   */
  private async executeImport(
    members: GoogleFormMember[],
  ): Promise<MemberImportResult> {
    const summary =
      this.createSummary();

    summary.processed =
      members.length;

    const existingMembers =
      await this.getExistingMembers();

    const validationErrors =
      this.validateMembers(
        members,
        existingMembers,
      );

    this.updateSummary(
      summary,
      validationErrors,
    );

    const validMembers =
      this.filterValidMembers(
        members,
        validationErrors,
      );

    const memberInserts =
      this.prepareMembers(
        validMembers,
        existingMembers,
      );

    const insertedMembers =
      await this.insertMembers(
        memberInserts,
      );

    summary.imported =
      insertedMembers.length;

    summary.skipped =
      summary.processed -
      summary.imported;

    return {
      success:
        insertedMembers.length > 0,

      summary,

      inserted:
        insertedMembers,

      validationErrors,
    };
  }
    /**
   * Imports validated members into
   * the members table.
   */
  public async importMembers(
    members: GoogleFormMember[],
  ): Promise<MemberImportResult> {
    try {
      return await this.executeImport(
        members,
      );
    } catch (error) {
      console.error(
        "[MemberImportService] Import failed:",
        error,
      );

      const summary =
        this.createSummary();

      summary.processed =
        members.length;

      summary.imported = 0;

      summary.skipped =
        members.length;

      return {
        success: false,

        summary,

        inserted: [],

        validationErrors: [
          {
            rowNumber: 0,

            type:
              "MISSING_FULL_NAME",

            message:
              error instanceof Error
                ? error.message
                : "Unknown import error.",
          },
        ],
      };
    }
  }

  /**
   * Validates members without
   * importing them.
   */
  public async previewImport(
    members: GoogleFormMember[],
  ): Promise<{
    summary: ImportSummary;
    validationErrors: ImportValidationError[];
  }> {
    const summary =
      this.createSummary();

    summary.processed =
      members.length;

    const existingMembers =
      await this.getExistingMembers();

    const validationErrors =
      this.validateMembers(
        members,
        existingMembers,
      );

    this.updateSummary(
      summary,
      validationErrors,
    );

    summary.imported =
      members.length -
      summary.skipped;

    return {
      summary,
      validationErrors,
    };
  }

  /**
   * Returns true if the import
   * contains no validation errors.
   */
  public async canImport(
    members: GoogleFormMember[],
  ): Promise<boolean> {
    const preview =
      await this.previewImport(
        members,
      );

    return (
      preview.validationErrors
        .length === 0
    );
  }
}

export const memberImportService =
  new MemberImportService();

export default memberImportService;