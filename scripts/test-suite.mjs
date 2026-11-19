import test, { describe, it } from "node:test";
import assert from "node:assert/strict";

// RANKS from PromotionEngine
const RANKS = [
  "Community Care",
  "Trainee",
  "Paramedic",
  "Nurse",
  "Head Nurse",
  "Consultant",
  "Senior Consultant",
  "Junior Doctor",
  "Doctor",
  "Senior Doctor",
  "Assistant Surgeon",
  "Surgeon",
  "Senior Surgeon",
  "Senior Specialist",
  "Medical Officer",
  "Operational Specialist",
  "Medical Supervisor",
  "Clinical Operations Head",
  "Assistant Chief",
  "Chief",
  "Director",
];

const MANAGEMENT_RANKS = [
  "Assistant Chief",
  "Chief",
  "Director",
];

const MAX_DOUBLE_PROMOTION_RANK = "Senior Consultant";

function rankIndex(rank) {
  return RANKS.indexOf(rank);
}

function isManagement(rank) {
  return MANAGEMENT_RANKS.includes(rank);
}

function canReceiveDoublePromotion(rank) {
  return rankIndex(rank) <= rankIndex(MAX_DOUBLE_PROMOTION_RANK);
}

function nextRank(currentRank, promotionType) {
  const currentIndex = rankIndex(currentRank);
  if (currentIndex === -1) return null;

  let nextIndex = currentIndex;
  switch (promotionType) {
    case "SINGLE":
      nextIndex += 1;
      break;
    case "DOUBLE":
      nextIndex += 2;
      break;
    default:
      nextIndex = currentIndex;
  }

  if (nextIndex >= RANKS.length) {
    nextIndex = RANKS.length - 1;
  }

  return RANKS[nextIndex];
}

function determinePromotionType(rank, totalHours, leaderboardPosition, requiredHours = 25) {
  if (isManagement(rank)) {
    return "MANAGEMENT_REWARD";
  }

  if (leaderboardPosition <= 3 && canReceiveDoublePromotion(rank)) {
    return "DOUBLE";
  }

  return "SINGLE";
}

function isEligible(rank, totalHours, dutyDays = 0, requiredHours = 25, requiredDays = 0) {
  if (isManagement(rank)) {
    return false;
  }

  const hoursEligible = totalHours >= requiredHours;
  const daysEligible = requiredDays > 0 ? dutyDays >= requiredDays : true;

  return hoursEligible && daysEligible;
}

function calculateHours(logs) {
  return logs.reduce((total, log) => total + Number(log.duty_hours || 0), 0);
}

describe("Unit Tests: PromotionEngine Logic", () => {
  it("should advance Head Nurse by 2 ranks on DOUBLE promotion", () => {
    const next = nextRank("Head Nurse", "DOUBLE");
    assert.equal(next, "Senior Consultant");
  });

  it("should advance Head Nurse by 1 rank on SINGLE promotion", () => {
    const next = nextRank("Head Nurse", "SINGLE");
    assert.equal(next, "Consultant");
  });

  it("should cap at Director for top rank", () => {
    const next = nextRank("Director", "DOUBLE");
    assert.equal(next, "Director");
  });

  it("should determine DOUBLE promotion for top 3 candidates within eligible rank tier", () => {
    const type = determinePromotionType("Head Nurse", 70.36, 2, 80);
    assert.equal(type, "DOUBLE");
  });

  it("should determine SINGLE promotion for candidates below rank 3", () => {
    const type = determinePromotionType("Nurse", 61.43, 4, 80);
    assert.equal(type, "SINGLE");
  });

  it("should determine MANAGEMENT_REWARD for management roles", () => {
    const type = determinePromotionType("Chief", 120, 1, 80);
    assert.equal(type, "MANAGEMENT_REWARD");
  });

  it("should correctly check eligibility thresholds", () => {
    // 70.36 hrs < 80 hrs -> not eligible yet
    assert.equal(isEligible("Head Nurse", 70.36, 19, 80, 40), false);
    // 94.45 hrs >= 80 hrs, but 17 days < 40 days -> not eligible yet
    assert.equal(isEligible("Doctor", 94.45, 17, 80, 40), false);
    // 85 hrs >= 80 hrs, and 40 days >= 40 days -> eligible!
    assert.equal(isEligible("Doctor", 85, 40, 80, 40), true);
  });

  it("should correctly sum duty hours and prevent float precision artifacts", () => {
    const logs = [
      { duty_hours: 35.12 },
      { duty_hours: 35.24 },
    ];
    const total = calculateHours(logs);
    assert.equal(total.toFixed(2), "70.36");
    const remaining = 80 - total;
    assert.equal(remaining.toFixed(2), "9.64");
  });
});

describe("Integration Tests: Route Consistency & Link Health", () => {
  it("should ensure all critical dashboard routes exist", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const rootDir = path.resolve(import.meta.dirname, "..");

    const criticalRoutes = [
      "app/dashboard/page.tsx",
      "app/dashboard/my-promotion/page.tsx",
      "app/dashboard/promotion/page.tsx",
      "app/dashboard/promotion-cycles/page.tsx",
      "app/dashboard/members/page.tsx",
      "app/dashboard/patients/page.tsx",
      "app/dashboard/recruitment/page.tsx",
      "app/dashboard/report/page.tsx",
      "app/dashboard/settings/page.tsx",
      "app/dashboard/profile/page.tsx",
    ];

    for (const route of criticalRoutes) {
      const fullPath = path.resolve(rootDir, route);
      assert.ok(fs.existsSync(fullPath), `Route file ${route} must exist`);
    }
  });

  it("should verify next.config.ts has permanent redirects for legacy routes", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const rootDir = path.resolve(import.meta.dirname, "..");
    const nextConfig = fs.readFileSync(path.resolve(rootDir, "next.config.ts"), "utf-8");
    assert.ok(nextConfig.includes('destination: "/dashboard/report"'));
    assert.ok(nextConfig.includes('destination: "/dashboard/promotion"'));
  });
});
