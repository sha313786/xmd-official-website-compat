"use client";

import { Badge } from "@/components/ui/badge";
import { Clock3, Timer } from "lucide-react";

interface DutyStatusCardProps {
  isOnDuty: boolean;
  lastDuty: string | null;
  currentDutyDuration: string | null;
}

export default function DutyStatusCard({
  isOnDuty,
  lastDuty,
  currentDutyDuration,
}: DutyStatusCardProps) {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Duty Status
      </h3>

      {isOnDuty ? (
        <div className="space-y-3">
          <Badge className="bg-green-600 hover:bg-green-600 text-white">
            🟢 ON DUTY
          </Badge>

          <div className="flex items-center gap-2 text-sm">
            <Timer className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">
              Duration:
            </span>
            <span className="font-medium">
              {currentDutyDuration ?? "--"}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Badge variant="secondary">
            🔴 OFF DUTY
          </Badge>

          <div className="flex items-center gap-2 text-sm">
            <Clock3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Last Duty:
            </span>
            <span className="font-medium">
              {lastDuty
                ? new Date(lastDuty).toLocaleString()
                : "No duty recorded"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}