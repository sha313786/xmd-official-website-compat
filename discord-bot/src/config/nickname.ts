/**
 * XMD Nickname System Configuration
 */

export const NicknameConfig = {
  /**
   * Channel where members send their RP names.
   */
  CHANNEL_ID: "1526569924305354843",

  /**
   * Management role allowed to approve/reject.
   */
  MANAGEMENT_ROLE_ID: "1525391646936662066",

  /**
   * Nickname prefix.
   */
  PREFIX: "[XMD]",

  MIN_LENGTH: 3,

  MAX_LENGTH: 32,

  // Only uppercase English letters and spaces
  NAME_REGEX: /^[A-Z ]+$/,

  REACTIONS: {
    APPROVE: "✅",
    REJECT: "❌",
  },
} as const;