import { createClient } from "@/lib/supabase/client";

import { Report } from "@/types";

type ReportRow = {
  id: string;
  title: string;
  description: string;
  member_name: string;
  member_id: string;
  report_type: Report["reportType"];
  priority: Report["priority"];
  status: Report["status"];
  assigned_to: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export const reportService = {
  async getAll(): Promise<Report[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((report) =>
      this.mapReport(report as ReportRow)
    );
  },

  async getById(id: string): Promise<Report | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data
      ? this.mapReport(data as ReportRow)
      : null;
  },

  async create(
    report: Omit<
      Report,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<Report> {
    const payload = {
      title: report.title,
      description: report.description,
      member_name: report.memberName,
      member_id: report.memberId,
      report_type: report.reportType,
      priority: report.priority,
      status: report.status,
      assigned_to: report.assignedTo,
      created_by: report.createdBy,
    };

    const supabase = createClient();

    const { data, error } = await supabase
      .from("reports")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return this.mapReport(data as ReportRow);
  },

  async update(
    id: string,
    updates: Partial<Report>
  ): Promise<Report> {
    const payload = {
      title: updates.title,
      description: updates.description,
      member_name: updates.memberName,
      member_id: updates.memberId,
      report_type: updates.reportType,
      priority: updates.priority,
      status: updates.status,
      assigned_to: updates.assignedTo,
      created_by: updates.createdBy,
    };

    const supabase = createClient();

    const { data, error } = await supabase
      .from("reports")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return this.mapReport(data as ReportRow);
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  mapReport(data: ReportRow): Report {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      memberName: data.member_name,
      memberId: data.member_id,
      reportType: data.report_type,
      priority: data.priority,
      status: data.status,
      assignedTo: data.assigned_to,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};