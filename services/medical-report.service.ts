import { createClient } from "@/lib/supabase/client";

export interface CreateMedicalReportInput {
  patientId: string;
  reportName: string;
  reportType?: string;
  description?: string;
  file: File;
}

export const medicalReportService = {
  async create(input: CreateMedicalReportInput) {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    if (!user) {
      throw new Error("You must be logged in.");
    }

    const file = input.file;

    if (!file) {
      throw new Error("Please select a report file.");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed.");
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error("File size must be less than 10 MB.");
    }

    const extension = "pdf";

    const filePath =
      `${input.patientId}/` +
      `${crypto.randomUUID()}.${extension}`;

    // Upload file
    const { error: uploadError } =
      await supabase.storage
        .from("medical-reports")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

    if (uploadError) {
      throw new Error(
        `File upload failed: ${uploadError.message}`
      );
    }

    // Create database record
    const { data, error: insertError } =
      await supabase
        .from("medical_reports")
        .insert({
          patient_id: input.patientId,
          report_name: input.reportName.trim(),
          report_type:
            input.reportType?.trim() || null,
          description:
            input.description?.trim() || null,
          file_path: filePath,
          uploaded_by: user.id,
        })
        .select()
        .single();

    if (insertError) {
      // Remove uploaded file if database insert fails
      await supabase.storage
        .from("medical-reports")
        .remove([filePath]);

      throw new Error(
        `Failed to save report: ${insertError.message}`
      );
    }

    return data;
  },
};