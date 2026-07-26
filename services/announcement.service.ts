import { announcements } from "@/data";

export const announcementService = {
  getAll() {
    return announcements;
  },

  getHighPriority() {
    return announcements.filter(
      (announcement) => announcement.priority === "high"
    );
  },
};