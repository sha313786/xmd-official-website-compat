import { createClient } from "@/lib/supabase/client";
import {
  Notification,
  NotificationInsert,
} from "@/types/notification";

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

    return (data ?? []).map((notification) =>
      this.mapNotification(
        notification as NotificationRow
      )
    );
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

    return this.mapNotification(
      data as NotificationRow
    );
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