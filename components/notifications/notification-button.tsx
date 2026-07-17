"use client";

import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useNotifications } from "@/hooks/notifications/use-notifications";
import { NotificationDropdown } from "./notification-dropdown";

interface NotificationButtonProps {
  memberId: string;
}

export function NotificationButton({
  memberId,
}: NotificationButtonProps) {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications(memberId);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </Button>
        }
      />

      <PopoverContent
        align="end"
        className="w-[400px] p-0"
      >
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          loading={loading}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
      </PopoverContent>
    </Popover>
  );
}