import { useCallback, useEffect, useState } from "react";

import { Notification } from "@/types";
import { notificationService } from "@/services/notification/notification.service";
import { createClient } from "@/lib/supabase/client";

export function useNotifications(memberId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    if (!memberId) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [items, unread] = await Promise.all([
        notificationService.getNotifications(memberId),
        notificationService.getUnreadCount(memberId),
      ]);

      setNotifications(items);
      setUnreadCount(unread);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
  const id = requestAnimationFrame(() => {
    void loadNotifications();
  });

  return () => cancelAnimationFrame(id);
}, [loadNotifications]);

  useEffect(() => {
    if (!memberId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`notifications-${memberId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `member_id=eq.${memberId}`,
        },
        () => {
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [memberId, loadNotifications]);

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    await loadNotifications();
  };

  const markAllAsRead = async () => {
    if (!memberId) return;

    await notificationService.markAllAsRead(memberId);
    await loadNotifications();
  };

  return {
    notifications,
    unreadCount,
    loading,
    refresh: loadNotifications,
    markAsRead,
    markAllAsRead,
  };
}