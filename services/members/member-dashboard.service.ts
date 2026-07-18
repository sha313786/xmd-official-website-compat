import {
  memberService,
  notificationService,
} from "@/services";

import { dutyService } from "@/services/duty-service";
import { promotionService } from "@/services/promotion.service";

import {
  MemberActivity,
  MemberDashboardData,
  MemberPromotionType,
} from "@/types/member-dashboard";

export const memberDashboardService = {
  async getDashboard(
    memberId: string
  ): Promise<MemberDashboardData | null> {
    try {
      const member =
        await memberService.getById(memberId);

      if (!member) {
        return null;
      }

      const dutyStats =
        await dutyService.getMemberDutyStats(
          memberId
        );

      let promotionResult = null;

      try {
        if (dutyStats.cycleId) {
          promotionResult =
            await promotionService.getMemberResult(
              dutyStats.cycleId,
              memberId
            );
        }
      } catch (error) {
        console.warn(
          "Unable to load promotion result.",
          error
        );
      }

      const notifications =
        await notificationService.getNotifications(
          memberId
        );

      const activities: MemberActivity[] =
        notifications
          .slice(0, 5)
          .map((notification) => ({
            id: notification.id,

            type: "NOTIFICATION",

            title: notification.title,

            description:
              notification.message,

            createdAt:
              notification.createdAt,
          }));

      return {
        profile: {
          id: member.id,

          memberId:
            member.badgeNumber,

          discordId:
            member.discordId,

          name:
            member.fullName,

          callsign:
            member.badgeNumber,

          rank:
            member.rank,

          department:
            member.department,

          avatarUrl:
            member.avatar,

          status:
            member.status.toUpperCase() as
              | "ACTIVE"
              | "INACTIVE"
              | "SUSPENDED",

          joinedAt:
            member.joinedAt,
        },

        statistics: {
          totalDutyHours:
            dutyStats.dutyHours,

          totalDutyDays:
            dutyStats.dutyDays,

          attendancePercentage: 100,

          promotionProgress:
            dutyStats.progress,

          remainingHours:
            dutyStats.remainingHours,

          remainingDays:
            dutyStats.remainingDays,

          lastDuty:
            dutyStats.lastDuty,

          isOnDuty:
            dutyStats.isOnDuty,

          cycleName:
            dutyStats.cycleName,

          eligible:
            dutyStats.eligible,

          currentRank:
            promotionResult?.current_rank ??
            member.rank,

          nextRank:
            promotionResult?.new_rank ??
            null,

          promotionType:
            (promotionResult?.promotion_type as MemberPromotionType) ??
            "NONE",

          leaderboardPosition:
            promotionResult?.position ??
            null,
        },

        activities,
      };
    } catch (error) {
      console.error(
        "MEMBER DASHBOARD ERROR:",
        error
      );

      return null;
    }
  },
};