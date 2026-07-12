import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface PromotionSummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export function PromotionSummaryCard({
  title,
  value,
  icon: Icon,
  color,
}: PromotionSummaryCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl bg-muted p-4 ${color}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}