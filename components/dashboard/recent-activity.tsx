import { Activity, CalendarCheck, Clock3, Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    icon: Clock3,
    title: "Started Duty",
    time: "Today • 09:15",
  },
  {
    icon: Activity,
    title: "Completed Medical Call",
    time: "Today • 11:42",
  },
  {
    icon: Trophy,
    title: "Promotion Progress Updated",
    time: "Yesterday",
  },
  {
    icon: CalendarCheck,
    title: "Duty Completed",
    time: "2 Days Ago",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-white/10 bg-slate-900 text-white min-h-[320px]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="rounded-full bg-red-500/10 p-2">
                <Icon className="h-5 w-5 text-red-500" />
              </div>

              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}