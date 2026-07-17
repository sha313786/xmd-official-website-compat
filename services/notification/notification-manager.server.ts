import { NotificationInsert, NotificationType } from "@/types";
import { notificationServerService } from "./notification.server";

interface CreateNotificationParams {
  memberId: string;
  title: string;
  message: string;
  type: NotificationType;
  actionUrl?: string;
}

export const notificationServerManager = {
  async notify({
    memberId,
    title,
    message,
    type,
    actionUrl,
  }: CreateNotificationParams) {
    const payload: NotificationInsert = {
      member_id: memberId,
      title,
      message,
      type,
      action_url: actionUrl ?? null,
    };

    return notificationServerService.create(payload);
  },

  async notifyPromotion(
    memberId: string,
    rank: string
  ) {
    return this.notify({
      memberId,
      title: "Promotion",
      message: `Congratulations! You have been promoted to ${rank}.`,
      type: "promotion",
      actionUrl: "/dashboard/my-promotion",
    });
  },

  async notifyRecruitment(
    memberId: string,
    status: string
  ) {
    return this.notify({
      memberId,
      title: "Recruitment Update",
      message: `Your recruitment application has been ${status}.`,
      type: "recruitment",
      actionUrl: "/dashboard/recruitment",
    });
  },

  async notifyVerification(
    memberId: string
  ) {
    return this.notify({
      memberId,
      title: "Verification Complete",
      message:
        "Your Discord account has been successfully linked to your XMD account.",
      type: "verification",
      actionUrl: "/dashboard/profile",
    });
  },

  async notifyReport(
    memberId: string,
    reportTitle: string
  ) {
    return this.notify({
      memberId,
      title: "New Report Assigned",
      message: `A report has been assigned: ${reportTitle}`,
      type: "report",
      actionUrl: "/dashboard/report",
    });
  },

  async notifyAnnouncement(
    memberId: string,
    title: string,
    message: string
  ) {
    return this.notify({
      memberId,
      title,
      message,
      type: "announcement",
    });
  },

  async notifySystem(
    memberId: string,
    title: string,
    message: string
  ) {
    return this.notify({
      memberId,
      title,
      message,
      type: "system",
    });
  },
};