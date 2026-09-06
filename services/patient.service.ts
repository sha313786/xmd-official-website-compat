import { createClient } from "@/lib/supabase/client";
import { Patient } from "@/types/patient";

type PatientRecord = {
  id: string;
  auth_user_id: string | null;
  patient_id: string;
  full_name: string;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  blood_group: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
};

const mapPatient = (
  patient: PatientRecord
): Patient => {
  return {
    id: patient.id,
    authUserId: patient.auth_user_id,

    patientId: patient.patient_id,
    fullName: patient.full_name,

    dateOfBirth: patient.date_of_birth,
    phone: patient.phone,
    email: patient.email,
    address: patient.address,
    bloodGroup: patient.blood_group,

    status: patient.status as Patient["status"],

    createdAt: patient.created_at,
    updatedAt: patient.updated_at,
  };
};

export const patientService = {
  async create(
    values: {
      patientId: string;
      fullName: string;
      dateOfBirth?: string;
      phone?: string;
      address?: string;
      bloodGroup?: string;
      status: Patient["status"];
    }
  ): Promise<Patient> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("patients")
      .insert({
        patient_id: values.patientId,
        full_name: values.fullName,
        date_of_birth:
          values.dateOfBirth || null,
        phone: values.phone || null,
        address: values.address || null,
        blood_group:
          values.bloodGroup || null,
        status: values.status,
        auth_user_id: null,
        email: null,
      })
      .select("*")
      .single();

    if (error) {
      console.error(
        "CREATE PATIENT ERROR:",
        error
      );

      throw new Error(error.message);
    }

    return mapPatient(
      data as PatientRecord
    );
  },

  async getAll(): Promise<Patient[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "GET PATIENTS ERROR:",
        error
      );

      throw new Error(error.message);
    }

    return (data ?? []).map(
      (patient: PatientRecord) =>
        mapPatient(patient)
    );
  },

  async getById(
    id: string
  ): Promise<Patient | undefined> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(
        "GET PATIENT ERROR:",
        error
      );

      return undefined;
    }

    return mapPatient(
      data as PatientRecord
    );
  },

  async getByPatientId(
    patientId: string
  ): Promise<Patient | undefined> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("patient_id", patientId)
      .single();

    if (error || !data) {
      console.error(
        "GET PATIENT BY PATIENT ID ERROR:",
        error
      );

      return undefined;
    }

    return mapPatient(
      data as PatientRecord
    );
  },
};