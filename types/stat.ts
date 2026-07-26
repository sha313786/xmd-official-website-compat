export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  icon: string;
}