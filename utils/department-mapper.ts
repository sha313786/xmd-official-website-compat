/**
 * XMD Department Mapper
 *
 * Converts member ranks into internal departments.
 *
 * This mapper is shared by:
 *  - Sprint 24 (Existing Member Import)
 *  - Sprint 25 (Recruitment Approval)
 *  - Future Promotion Engine
 */

export const EMS_RANKS = [
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
] as const;

export const ADMINISTRATION_RANKS = [
  "Assistant Chief",
] as const;

export const MANAGEMENT_RANKS = [
  "Chief",
  "Director",
] as const;

export type Department =
  | "EMS"
  | "Administration"
  | "Management";

export const DEPARTMENT_MAP: Record<string, Department> = {
  // EMS
  "Community Care": "EMS",
  "Trainee": "EMS",
  "Paramedic": "EMS",
  "Nurse": "EMS",
  "Head Nurse": "EMS",
  "Consultant": "EMS",
  "Senior Consultant": "EMS",
  "Junior Doctor": "EMS",
  "Doctor": "EMS",
  "Senior Doctor": "EMS",
  "Assistant Surgeon": "EMS",
  "Surgeon": "EMS",
  "Senior Surgeon": "EMS",
  "Senior Specialist": "EMS",
  "Medical Officer": "EMS",
  "Operational Specialist": "EMS",
  "Medical Supervisor": "EMS",
  "Clinical Operations Head": "EMS",

  // Administration
  "Assistant Chief": "Administration",

  // Management
  "Chief": "Management",
  "Director": "Management",
};

/**
 * Returns the department for a given rank.
 *
 * Throws an Error when the rank does not exist.
 */
export function getDepartmentFromRank(rank: string): Department {
  const department = DEPARTMENT_MAP[rank.trim()];

  if (!department) {
    throw new Error(`Unknown XMD rank: ${rank}`);
  }

  return department;
}

/**
 * Returns true if the supplied rank exists.
 */
export function isValidRank(rank: string): boolean {
  return rank.trim() in DEPARTMENT_MAP;
}

/**
 * Returns every supported XMD rank.
 */
export function getAllRanks(): string[] {
  return Object.keys(DEPARTMENT_MAP);
}

/**
 * Returns all EMS ranks.
 */
export function getEMSRanks(): readonly string[] {
  return EMS_RANKS;
}

/**
 * Returns all Administration ranks.
 */
export function getAdministrationRanks(): readonly string[] {
  return ADMINISTRATION_RANKS;
}

/**
 * Returns all Management ranks.
 */
export function getManagementRanks(): readonly string[] {
  return MANAGEMENT_RANKS;
}