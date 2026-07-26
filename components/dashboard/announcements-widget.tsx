import { Megaphone } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const announcements = [
  {
    title: "Monthly Promotion Review",
    date: "15 July 2026",
  },
  {
    title: "XMD Training Session",
    date: "18 July 2026",
  },
  {
    title: "Hospital Protocol Updated",
    date: "20 July 2026",
  },
];

export function AnnouncementsWidget() {
  return (
    <Card className="border-white/10 bg-slate-900 text-white min-h-[320px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-red-500" />
          Announcements
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="border-b border-slate-800 pb-4 last:border-none"
          >
            <p className="font-medium">
              {announcement.title}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {announcement.date}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}