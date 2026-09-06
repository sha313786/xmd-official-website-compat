export type PatientStatus =
  | "active"
  | "inactive";

export interface Patient {
  id: string;

  authUserId: string | null;

  patientId: string;
  fullName: string;

  dateOfBirth: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  bloodGroup: string | null;

  status: PatientStatus;

  createdAt?: string;
  updatedAt?: string;
}