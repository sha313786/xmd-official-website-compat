import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  Notification,
  NotificationInsert,
} from "@/types";

type NotificationRow = {
  id: string;
  member_id: string;
  title: string;
  message: string;
  type: Notification["type"];
  is_read: boolean;
  action_url: string | null;
  created_at: string;
};

export const notificationServerService = {
  async create(
    notification: NotificationInsert
  ): Promise<Notification> {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) throw error;

    return this.mapNotification(
      data as NotificationRow
    );
  },

  async delete(id: string): Promise<void> {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async markAsRead(id: string): Promise<void> {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) throw error;
  },

  mapNotification(
    data: NotificationRow
  ): Notification {
    return {
      id: data.id,
      memberId: data.member_id,
      title: data.title,
      message: data.message,
      type: data.type,
      isRead: data.is_read,
      actionUrl: data.action_url,
      createdAt: data.created_at,
    };
  },
};