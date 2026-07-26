import { Card, CardContent } from "@/components/ui/card";

type PromotionProgressProps = {
  cycleName: string;
  progress: number;
  dutyHours: number;
};

export default function PromotionProgress({
  cycleName,
  progress,
  dutyHours,
}: PromotionProgressProps) {
  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="p-6">
        <h2 className="mb-6 text-xl font-bold">
          Promotion Progress
        </h2>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-400">
              Current Promotion Cycle
            </p>

            <p className="font-semibold">
              {cycleName}
            </p>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>

              <span>{progress}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-red-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Personal Duty Hours
            </p>

            <p className="text-2xl font-bold">
              {dutyHours} Hours
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}