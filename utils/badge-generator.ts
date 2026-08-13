/**
 * XMD Badge Generator
 *
 * Generates sequential XMD badge numbers.
 *
 * Examples:
 *
 * XMD-001
 * XMD-002
 * ...
 * XMD-099
 * XMD-100
 * ...
 */

const BADGE_PREFIX = "XMD-";
const DEFAULT_START = 1;

export interface BadgeGenerationResult {
  previousBadge: string | null;
  nextBadge: string;
  previousNumber: number;
  nextNumber: number;
}

/**
 * Extracts the numeric portion of a badge.
 *
 * XMD-001 -> 1
 * XMD-120 -> 120
 */
export function extractBadgeNumber(
  badgeNumber: string | null | undefined,
): number {
  if (!badgeNumber) {
    return 0;
  }

  const match = badgeNumber
    .trim()
    .match(/^XMD-(\d+)$/i);

  if (!match) {
    return 0;
  }

  return Number(match[1]);
}

/**
 * Formats a badge number.
 *
 * 1 -> XMD-001
 * 9 -> XMD-009
 * 10 -> XMD-010
 * 100 -> XMD-100
 */
export function formatBadgeNumber(
  number: number,
): string {
  return `${BADGE_PREFIX}${number
    .toString()
    .padStart(3, "0")}`;
}

/**
 * Generates the next badge from the current highest badge.
 *
 * Example:
 *
 * XMD-047
 *
 * becomes
 *
 * XMD-048
 */
export function generateNextBadge(
  highestBadge: string | null,
): BadgeGenerationResult {
  const previousNumber = extractBadgeNumber(highestBadge);

  const nextNumber =
    previousNumber > 0
      ? previousNumber + 1
      : DEFAULT_START;

  return {
    previousBadge: highestBadge,
    nextBadge: formatBadgeNumber(nextNumber),
    previousNumber,
    nextNumber,
  };
}

/**
 * Returns true if a badge format is valid.
 */
export function isValidBadgeNumber(
  badgeNumber: string,
): boolean {
  return /^XMD-\d+$/i.test(
    badgeNumber.trim(),
  );
}

/**
 * Compares two badge numbers.
 *
 * Returns:
 * 0 = equal
 * 1 = badgeA greater
 * -1 = badgeB greater
 */
export function compareBadges(
  badgeA: string,
  badgeB: string,
): number {
  const a = extractBadgeNumber(badgeA);
  const b = extractBadgeNumber(badgeB);

  if (a === b) {
    return 0;
  }

  return a > b ? 1 : -1;
}

/**
 * Returns the highest badge from a list.
 *
 * Example:
 *
 * XMD-004
 * XMD-017
 * XMD-032
 *
 * Returns:
 *
 * XMD-032
 */
export function getHighestBadge(
  badges: string[],
): string | null {
  if (badges.length === 0) {
    return null;
  }

  let highest: string | null = null;
  let highestNumber = 0;

  for (const badge of badges) {
    const number = extractBadgeNumber(badge);

    if (number > highestNumber) {
      highestNumber = number;
      highest = badge;
    }
  }

  return highest;
}