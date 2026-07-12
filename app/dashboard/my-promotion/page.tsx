"use client";

import PromotionProgressCard from "@/components/promotion/member/promotion-progress-card";

import { useMemberPromotion } from "@/hooks/promotion/use-member-promotion";

export default function MyPromotionPage() {
  const {
    cycle,
    result,
    loading,
  } = useMemberPromotion();

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading promotion...
      </div>
    );
  }

  if (!cycle) {
    return (
      <div className="p-8 text-red-500">
        No active promotion cycle found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          My Promotion
        </h1>

        <p className="text-slate-400">
          View your promotion progress and eligibility.
        </p>
      </div>

      <PromotionProgressCard
        cycle={cycle}
        result={result}
      />
    </div>
  );
}