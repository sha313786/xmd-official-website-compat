import { dashboardStats, dutyChartData } from "@/data";

export const dashboardService = {
  getStats() {
    return dashboardStats;
  },

  getDutyChart() {
    return dutyChartData;
  },
};