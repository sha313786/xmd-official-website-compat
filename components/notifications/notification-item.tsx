"use client";

import {
  Bell,
  FileText,
  Megaphone,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Notification } from "@/types";

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => Promise<void> | void;
}

const icons = {
  announcement: Megaphone,
  promotion: Trophy,
  recruitment: UserCheck,
  verification: ShieldCheck,
  report: FileText,
  system: Bell,
};

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const router = useRouter();

  const Icon = icons[notification.type] ?? Bell;

  const handleClick = async () => {
    if (!notification.isRead) {
      await onRead?.(notification.id);
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-lg border p-3 text-left transition hover:bg-muted ${
        !notification.isRead ? "bg-muted/50" : ""
      }`}
    >
      <div className="flex gap-3">
        <Icon className="mt-1 h-5 w-5 shrink-0" />

        <div className="flex-1">
          <div className="font-medium">
            {notification.title}
          </div>

          <div className="text-sm text-muted-foreground">
            {notification.message}
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            {new Date(notification.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </button>
  );
}