"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { patientService } from "@/services/patient.service";
import { Patient } from "@/types/patient";

export function usePatients() {
  const [patients, setPatients] = useState<
    Patient[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await patientService.getAll();

      setPatients(data);
    } catch (error) {
      console.error(
        "LOAD PATIENTS ERROR:",
        error
      );

      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      void refresh();
    });

    return () =>
      cancelAnimationFrame(id);
  }, [refresh]);

  return {
    patients,
    loading,
    refresh,
  };
}

export function usePatient(
  id: string
) {
  const [patient, setPatient] =
    useState<Patient>();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPatient() {
      try {
        const data =
          await patientService.getById(id);

        setPatient(data);
      } finally {
        setLoading(false);
      }
    }

    void loadPatient();
  }, [id]);

  return {
    patient,
    loading,
  };
}