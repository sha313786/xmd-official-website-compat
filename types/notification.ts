export type NotificationType =
  | "announcement"
  | "promotion"
  | "recruitment"
  | "verification"
  | "system"
  | "report";

export interface Notification {
  id: string;
  memberId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl: string | null;
  createdAt: string;
}

export interface NotificationInsert {
  member_id: string;
  title: string;
  message: string;
  type: NotificationType;
  action_url?: string | null;
}