"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  PatientForm,
  PatientFormValues,
} from "./patient-form";

import { patientService } from "@/services/patient.service";

interface AddPatientDialogProps {
  onSuccess?: () => void;
}

export function AddPatientDialog({
  onSuccess,
}: AddPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: PatientFormValues
  ) => {
    try {
      setLoading(true);

      await patientService.create(values);

      onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.error(
        "CREATE PATIENT ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create patient."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Patient
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Add New Patient
            </DialogTitle>
          </DialogHeader>

          <PatientForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}