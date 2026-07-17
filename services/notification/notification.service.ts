import { createClient } from "@/lib/supabase/client";
import {
  Notification,
  NotificationInsert,
} from "@/types/notification";

export const notificationService = {
  async getNotifications(
    memberId: string
  ): Promise<Notification[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("member_id", memberId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []).map(this.mapNotification);
  },

  async getUnreadCount(
    memberId: string
  ): Promise<number> {
    const supabase = createClient();

    const { count, error } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("member_id", memberId)
      .eq("is_read", false);

    if (error) throw error;

    return count ?? 0;
  },

  async markAsRead(
    id: string
  ): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) throw error;
  },

  async markAllAsRead(
    memberId: string
  ): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("member_id", memberId)
      .eq("is_read", false);

    if (error) throw error;
  },

  async create(
    notification: NotificationInsert
  ): Promise<Notification> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) throw error;

    return this.mapNotification(data);
  },

  async delete(
    id: string
  ): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  mapNotification(data: any): Notification {
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