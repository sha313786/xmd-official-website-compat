import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLeaderboard } from "@/hooks";

export function LeaderboardWidget() {
  const leaderboard = useLeaderboard();

  return (
    <Card className="min-h-[320px] border-white/10 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top 5 Leaderboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {leaderboard.map((member, index) => (
          <div
            key={member.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                {index + 1}
              </div>

              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-slate-400">
                  {member.rank}
                </p>
              </div>
            </div>

            <span className="font-semibold">{member.hours} hrs</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}