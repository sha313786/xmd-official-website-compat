"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Notification } from "@/types";
import { NotificationItem } from "./notification-item";

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export function NotificationDropdown({
  notifications,
  unreadCount,
  loading,
  markAsRead,
  markAllAsRead,
}: NotificationDropdownProps) {
  return (
    <div className="w-[380px]">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h3 className="font-semibold">
            Notifications
          </h3>

          <p className="text-xs text-muted-foreground">
            {unreadCount} unread
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          disabled={!unreadCount}
        >
          Mark all read
        </Button>
      </div>

      {loading ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          Loading...
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          No notifications
        </div>
      ) : (
        <ScrollArea className="h-[420px]">
          <div className="space-y-2 p-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}