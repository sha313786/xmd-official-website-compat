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

  const requiredHours = Number(cycle?.required_hours ?? 25);

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Info
            label="Current Rank"
            value={result?.current_rank || "Trainee"}
          />

          <Info
            label="Next Rank"
            value={result?.new_rank || "-"}
          />

          <Info
            label="Promotion Type"
            value={
              result?.promotion_type === "MANAGEMENT_REWARD"
                ? "Management Role"
                : result?.promotion_type === "DOUBLE"
                ? "Double Promotion"
                : result?.promotion_type === "SINGLE"
                ? "Single Promotion"
                : "Single Promotion"
            }
          />

          <Info
            label="Duty Hours"
            value={`${Number(totalHours).toFixed(2)} / ${requiredHours}`}
          />

          <Info
            label="Duty Days"
            value={`${result?.duty_days ?? 0}${cycle?.required_days ? ` / ${cycle.required_days}` : ""}`}
          />

          <Info
            label="Leaderboard Position"
            value={
              result?.position
                ? `#${result.position}`
                : "-"
            }
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-800 p-4">
          {totalHours >= requiredHours && (!cycle?.required_days || (result?.duty_days ?? 0) >= cycle.required_days) ? (
            <p className="font-semibold text-green-400">
              Eligible for Promotion
            </p>
          ) : (
            <div className="space-y-1">
              {totalHours < requiredHours && (
                <p className="font-semibold text-yellow-400">
                  {Number(remainingHours).toFixed(2)} more duty hour
                  {remainingHours === 1 ? "" : "s"} required
                </p>
              )}
              {cycle?.required_days && (result?.duty_days ?? 0) < cycle.required_days && (
                <p className="text-sm text-slate-400">
                  {cycle.required_days - (result?.duty_days ?? 0)} more duty day
                  {cycle.required_days - (result?.duty_days ?? 0) === 1 ? "" : "s"} required
                </p>
              )}
            </div>
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