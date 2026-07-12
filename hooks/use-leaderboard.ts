import { leaderboardService } from "@/services";

export function useLeaderboard() {
  return leaderboardService.getTopMembers();
}