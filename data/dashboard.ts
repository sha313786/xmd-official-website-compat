import { DashboardStat, DutyChartData } from "@/types";

export const dashboardStats: DashboardStat[] = [
  {
    id: "rank",
    title: "Current Rank",
    value: "Senior Consultant",
    icon: "Award",
  },
  {
    id: "hours",
    title: "Duty Hours",
    value: "76h",
    icon: "Clock3",
  },
  {
    id: "days",
    title: "Duty Days",
    value: "15",
    icon: "CalendarDays",
  },
  {
    id: "promotion",
    title: "Promotion",
    value: "Eligible",
    icon: "TrendingUp",
  },
];

export const dutyChartData: DutyChartData[] = [
  { month: "Jan", hours: 2100 },
  { month: "Feb", hours: 2350 },
  { month: "Mar", hours: 2480 },
  { month: "Apr", hours: 2620 },
  { month: "May", hours: 2780 },
  { month: "Jun", hours: 2940 },
];