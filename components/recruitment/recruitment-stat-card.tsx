import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface RecruitmentStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function RecruitmentStatCard({
  title,
  value,
  icon: Icon,
  color,
}: RecruitmentStatCardProps) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>

          <h2 className="text-2xl font-bold leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}