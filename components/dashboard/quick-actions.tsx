import Link from "next/link";
import {
  ClipboardList,
  Megaphone,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Promotion Tracker",
    href: "/dashboard/promotion-tracker",
    icon: Trophy,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Discord Verification",
    href: "/dashboard/discord",
    icon: Users,
  },
  {
    title: "Announcements",
    href: "/dashboard/announcements",
    icon: Megaphone,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function QuickActions() {
  return (
    <Card className="min-h-[320px] border-white/10 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center justify-between rounded-lg border border-slate-800 p-3 transition-all hover:border-red-500 hover:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-red-500" />
                <span>{action.title}</span>
              </div>

              <span className="text-slate-500">→</span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}