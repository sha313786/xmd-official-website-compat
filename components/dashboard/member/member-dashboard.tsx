"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMemberDashboard } from "@/hooks/member/use-member-dashboard";

import MemberInformation from "./member-information";
import MemberStatCard from "./member-stat-card";
import PromotionOverviewCard from "./promotion-overview-card";
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
      {/* Top Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MemberInformation
          profile={profile}
        />

        <PromotionOverviewCard
          cycleName={statistics.cycleName}
          currentRank={statistics.currentRank}
          nextRank={statistics.nextRank}
          dutyHours={statistics.totalDutyHours}
          dutyDays={statistics.totalDutyDays}
          remainingHours={statistics.remainingHours}
          remainingDays={statistics.remainingDays}
          progress={statistics.promotionProgress}
          leaderboardPosition={
            statistics.leaderboardPosition
          }
          promotionType={
            statistics.promotionType
          }
          eligible={statistics.eligible}
        />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <MemberStatCard
          title="Duty Hours"
          value={statistics.totalDutyHours}
        />

        <MemberStatCard
          title="Duty Days"
          value={statistics.totalDutyDays}
        />

        <MemberStatCard
          title="Progress"
          value={`${statistics.promotionProgress}%`}
        />

        <MemberStatCard
          title="Current Rank"
          value={statistics.currentRank}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity
          activities={activities}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              Achievements
            </CardTitle>
          </CardHeader>

          <CardContent className="flex h-56 items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                Coming Soon
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Achievements, awards and milestones
                will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}