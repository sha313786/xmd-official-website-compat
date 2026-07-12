import { Card, CardContent } from "@/components/ui/card";

import {
  PromotionCycle,
  PromotionResult,
} from "@/types/promotion";

type PromotionProgressCardProps = {
  cycle: PromotionCycle;
  result: PromotionResult | null;
};

export default function PromotionProgressCard({
  cycle,
  result,
}: PromotionProgressCardProps) {
  const totalHours = result?.total_hours ?? 0;

  const requiredHours = 25;

  const percentage = Math.min(
    (totalHours / requiredHours) * 100,
    100
  );

  const remainingHours = Math.max(
    requiredHours - totalHours,
    0
  );

  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold">
            My Promotion
          </h2>

          <p className="text-slate-400">
            {cycle.name}
          </p>

          <p className="text-sm text-slate-500">
            {cycle.start_date} → {cycle.end_date}
          </p>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Promotion Progress</span>

            <span>
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-red-600 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Info
            label="Duty Hours"
            value={`${totalHours} / ${requiredHours}`}
          />

          <Info
            label="Duty Days"
            value={result?.duty_days ?? 0}
          />

          <Info
            label="Leaderboard Position"
            value={
              result?.position
                ? `#${result.position}`
                : "-"
            }
          />

          <Info
            label="Promotion Type"
            value={
              result?.promotion_type ?? "NONE"
            }
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-800 p-4">
          {totalHours >= requiredHours ? (
            <p className="font-semibold text-green-400">
              Eligible for Promotion
            </p>
          ) : (
            <p className="font-semibold text-yellow-400">
              {remainingHours} more duty hour
              {remainingHours === 1 ? "" : "s"} required
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-800 p-4">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}