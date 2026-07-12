"use client";

import { useMemo, useState } from "react";

import { ManagementRouteGuard } from "@/components/shared/management-route-guard";

import { CreatePromotionCycleDialog } from "@/components/promotion/cycles/create-promotion-cycle-dialog";
import { PromotionCycleStats } from "@/components/promotion/cycles/promotion-cycle-stats";
import { PromotionCycleTable } from "@/components/promotion/cycles/promotion-cycle-table";
import { ViewPromotionCycleDialog } from "@/components/promotion/cycles/view-promotion-cycle-dialog";
import { EditPromotionCycleDialog } from "@/components/promotion/cycles/edit-promotion-cycle-dialog";
import { DeletePromotionCycleDialog } from "@/components/promotion/cycles/delete-promotion-cycle-dialog";
import { ActivateCycleDialog } from "@/components/promotion/cycles/activate-cycle-dialog";

import { usePromotionCycles } from "@/hooks/promotion/use-promotion-cycles";

import type { PromotionCycle } from "@/types/promotion";

export default function PromotionCyclesPage() {
  const {
    cycles,
    loading,
    refresh,
    createCycle,
    updateCycle,
    deleteCycle,
    activateCycle,
  } = usePromotionCycles();

  const [selectedCycle, setSelectedCycle] =
    useState<PromotionCycle | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);

  const stats = useMemo(() => {
    const now = new Date();

    return {
      total: cycles.length,
      active: cycles.filter((c) => c.is_active).length,
      completed: cycles.filter(
        (c) => new Date(c.end_date) < now
      ).length,
      upcoming: cycles.filter(
        (c) => new Date(c.start_date) > now
      ).length,
    };
  }, [cycles]);

  return (
    <ManagementRouteGuard>
      <div className="space-y-8 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Promotion Cycles
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage promotion periods, activate cycles, and generate
              promotion results.
            </p>
          </div>

          <CreatePromotionCycleDialog
            onCreate={createCycle}
          />
        </div>

        <PromotionCycleStats
          totalCycles={stats.total}
          activeCycles={stats.active}
          completedCycles={stats.completed}
          upcomingCycles={stats.upcoming}
        />

        {loading ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            Loading promotion cycles...
          </div>
        ) : (
          <PromotionCycleTable
            cycles={cycles}
            loading={loading}
            onView={(cycle) => {
              setSelectedCycle(cycle);
              setViewOpen(true);
            }}
            onEdit={(cycle) => {
              setSelectedCycle(cycle);
              setEditOpen(true);
            }}
            onDelete={(cycle) => {
              setSelectedCycle(cycle);
              setDeleteOpen(true);
            }}
            onActivate={(cycle) => {
              setSelectedCycle(cycle);
              setActivateOpen(true);
            }}
          />
        )}
      </div>

      <ViewPromotionCycleDialog
        cycle={selectedCycle}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <EditPromotionCycleDialog
        cycle={selectedCycle}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={updateCycle}
      />

      <DeletePromotionCycleDialog
        cycle={selectedCycle}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={deleteCycle}
      />

      <ActivateCycleDialog
        cycle={selectedCycle}
        open={activateOpen}
        onOpenChange={setActivateOpen}
        onActivate={async (id) => {
          await activateCycle(id);
          await refresh();
        }}
      />
    </ManagementRouteGuard>
  );
}