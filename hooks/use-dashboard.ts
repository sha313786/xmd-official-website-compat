import { dashboardService } from "@/services";

export function useDashboardStats() {
  return dashboardService.getStats();
}

export function useDutyChart() {
  return dashboardService.getDutyChart();
}