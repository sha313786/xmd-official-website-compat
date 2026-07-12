"use client";

import { useDashboardDuty } from "@/hooks/dashboard/use-dashboard-duty";

import DashboardStatCard from "@/components/dashboard/dashboard-stat-card";

import LiveDuration from "@/components/dashboard/live-duration";

export default function ManagementDashboard() {
  const {
    stats,
    activeDutyMembers,
    loading,
    error,
  } = useDashboardDuty();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading management dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Management Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live duty overview
        </p>
      </div>

      {/* Statistics */}
<div className="grid gap-4 md:grid-cols-2">
  <DashboardStatCard
    title="Active Duty"
    value={stats.activeDuty}
  />

  <DashboardStatCard
    title="Active Members Today"
    value={stats.activeMembersToday}
  />

  <DashboardStatCard
    title="Today's Duty Hours"
    value={stats.todayDutyHours.toFixed(2)}
  />

  <DashboardStatCard
    title="Promotion Cycle Hours"
    value={stats.promotionCycleHours.toFixed(2)}
  />
</div>
      {/* Active Duty Members */}
      <div className="rounded-xl border">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">
            Members Currently On Duty
          </h2>
        </div>

        {activeDutyMembers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No members are currently on duty.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4">Badge</th>
                  <th className="p-4">Member</th>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Started</th>
                  <th className="p-4">Duration</th>
                </tr>
              </thead>

              <tbody>
                {activeDutyMembers.map((member) => (
                  <tr
  key={member.id}
  className="border-b last:border-0"
>
  <td className="p-4">
    {member.badge_number ?? "-"}
  </td>

  <td className="p-4 font-medium">
    {member.full_name}
  </td>

  <td className="p-4">
    {member.rank ?? "-"}
  </td>

  <td className="p-4">
    {new Date(member.duty_start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </td>

  <td className="p-4">
  <LiveDuration dutyStart={member.duty_start} />
</td>
</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}