import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-red-500",
}: StatCardProps) {
  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className={color}>
          <Icon size={36} />
        </div>
      </CardContent>
    </Card>
  );
}