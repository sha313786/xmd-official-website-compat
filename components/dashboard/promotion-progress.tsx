import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PromotionProgress() {
  const progress = 76;

  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>Promotion Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <Progress value={progress} className="h-3" />

          <div className="flex justify-between text-sm text-slate-400">
            <span>{progress}% Complete</span>
            <span>Next Rank</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400">Current Rank</p>
              <p className="mt-1 text-lg font-bold">
                Senior Consultant
              </p>
            </div>

            <div>
              <p className="text-slate-400">Next Rank</p>
              <p className="mt-1 text-lg font-bold text-red-500">
                Junior Doctor
              </p>
            </div>

            <div>
              <p className="text-slate-400">Hours Completed</p>
              <p className="mt-1 text-lg font-bold">
                76 / 100 Hours
              </p>
            </div>

            <div>
              <p className="text-slate-400">Duty Days</p>
              <p className="mt-1 text-lg font-bold">
                15 / 18 Days
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}