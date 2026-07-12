import { announcementService } from "@/services";

export function useAnnouncements() {
  return announcementService.getAll();
}

export function useHighPriorityAnnouncements() {
  return announcementService.getHighPriority();
}