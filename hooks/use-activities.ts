import { activityService } from "@/services";

export function useRecentActivities() {
  return activityService.getRecent();
}