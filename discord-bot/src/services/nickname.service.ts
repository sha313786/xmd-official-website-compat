import { GuildMember } from "discord.js";
import { NicknameConfig } from "../config/nickname";

export class NicknameService {
  /**
   * Convert the input to uppercase and clean spaces.
   */
  static normalize(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();
  }

  /**
   * Validate the RP name.
   */
  static validate(name: string): {
    valid: boolean;
    message?: string;
  } {
    const normalized = this.normalize(name);

    if (
      normalized.length < NicknameConfig.MIN_LENGTH ||
      normalized.length > NicknameConfig.MAX_LENGTH
    ) {
      return {
        valid: false,
        message: `Name must be between ${NicknameConfig.MIN_LENGTH} and ${NicknameConfig.MAX_LENGTH} characters.`,
      };
    }

    if (!NicknameConfig.NAME_REGEX.test(normalized)) {
      return {
        valid: false,
        message:
          "Only letters (A-Z) and spaces are allowed.",
      };
    }

    return { valid: true };
  }

  /**
   * Format nickname.
   */
  static format(name: string): string {
    return `${NicknameConfig.PREFIX} ${this.normalize(name)}`;
  }

  /**
   * Change Discord nickname.
   */
  static async changeNickname(
    member: GuildMember,
    rpName: string
  ): Promise<void> {
    const nickname = this.format(rpName);

    await member.setNickname(nickname);
  }
}