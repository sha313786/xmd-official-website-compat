import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Report } from "@/types";

export const reportService = {
  async getAll(): Promise<Report[]> {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map(this.mapReport);
  },

  async getById(id: string): Promise<Report | null> {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data ? this.mapReport(data) : null;
  },

  async create(
    report: Omit<Report, "id" | "createdAt" | "updatedAt">
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

    const { data, error } = await supabase
      .from("reports")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return this.mapReport(data);
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

    const { data, error } = await supabase
      .from("reports")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return this.mapReport(data);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  mapReport(data: any): Report {
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