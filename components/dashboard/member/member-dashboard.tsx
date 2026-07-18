"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useMemberDashboard } from "@/hooks/member/use-member-dashboard";

import LiveDutySummary from "./live-duty-summary";
import MemberInformation from "./member-information";
import MemberQuickActions from "./member-quick-actions";
import MemberStatCard from "./member-stat-card";
import PromotionProgressCard from "./promotion-progress-card";
import PromotionTimelineCard from "./promotion-timeline-card";
import RecentActivity from "./recent-activity";

interface MemberDashboardProps {
  memberId: string;
}

export default function MemberDashboard({
  memberId,
}: MemberDashboardProps) {
  const {
    dashboard,
    profile,
    statistics,
    activities,
    loading,
    error,
    refresh,
  } = useMemberDashboard(memberId);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex h-96 items-center justify-center">
          Loading member dashboard...
        </CardContent>
      </Card>
    );
  }

  if (
    error ||
    !dashboard ||
    !profile ||
    !statistics
  ) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-10">
          <p className="text-sm text-muted-foreground">
            {error ??
              "Unable to load member dashboard."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <MemberInformation
        profile={profile}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MemberStatCard
          title="Duty Hours"
          value={statistics.totalDutyHours}
        />

        <MemberStatCard
          title="Duty Days"
          value={statistics.totalDutyDays}
        />

        <MemberStatCard
          title="Attendance"
          value={`${statistics.attendancePercentage}%`}
        />

        <MemberStatCard
          title="Promotion"
          value={`${statistics.promotionProgress}%`}
        />
      </div>

      <LiveDutySummary
        dutyHours={statistics.totalDutyHours}
        dutyDays={statistics.totalDutyDays}
        remainingHours={
          statistics.remainingHours
        }
        remainingDays={
          statistics.remainingDays
        }
        progress={
          statistics.promotionProgress
        }
        lastDuty={
          statistics.lastDuty
        }
        isOnDuty={
          statistics.isOnDuty
        }
        cycleName={
          statistics.cycleName
        }
        eligible={
          statistics.eligible
        }
      />

      <PromotionProgressCard
        dutyHours={
          statistics.totalDutyHours
        }
        dutyDays={
          statistics.totalDutyDays
        }
        remainingHours={
          statistics.remainingHours
        }
        remainingDays={
          statistics.remainingDays
        }
        progress={
          statistics.promotionProgress
        }
        cycleName={
          statistics.cycleName
        }
        eligible={
          statistics.eligible
        }
      />

      <PromotionTimelineCard
        currentRank={
          statistics.currentRank
        }
        nextRank={
          statistics.nextRank
        }
        promotionType={
          statistics.promotionType
        }
        leaderboardPosition={
          statistics.leaderboardPosition
        }
        progress={
          statistics.promotionProgress
        }
        remainingHours={
          statistics.remainingHours
        }
        remainingDays={
          statistics.remainingDays
        }
        eligible={
          statistics.eligible
        }
      />

      <MemberQuickActions
        onRefresh={refresh}
      />

      <RecentActivity
        activities={activities}
      />
    </div>
  );
}