"use client";

import { useCallback, useEffect, useState } from "react";

import { promotionService } from "@/services";
import { promotionCycleService } from "@/services/promotion-cycle.service";

import {
DutyLog,
PromotionCycle,
PromotionResult,
} from "@/types";

export function usePromotionCycles() {
const [cycles, setCycles] = useState<PromotionCycle[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const refresh = useCallback(async () => {
setLoading(true);
setError(null);

try {
  const data = await promotionCycleService.getCycles();
  setCycles(data);
} catch (err) {
  console.error(err);
  setError("Failed to load promotion cycles.");
} finally {
  setLoading(false);
}

}, []);

useEffect(() => {
refresh();
}, [refresh]);

async function createCycle(data: {
name: string;
start_date: string;
end_date: string;
}) {
await promotionCycleService.createCycle(data);
await refresh();
}

async function updateCycle(
id: string,
data: {
name: string;
start_date: string;
end_date: string;
}
) {
await promotionCycleService.updateCycle(id, data);
await refresh();
}

async function deleteCycle(id: string) {
await promotionCycleService.deleteCycle(id);
await refresh();
}

async function activateCycle(id: string) {
await promotionCycleService.setActiveCycle(id);
await refresh();
}

return {
cycles,
loading,
error,
refresh,
createCycle,
updateCycle,
deleteCycle,
activateCycle,
};
}

export function useActivePromotionCycle() {
const [cycle, setCycle] = useState<PromotionCycle | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function loadCycle() {
try {
const data = await promotionService.getActiveCycle();
setCycle(data);
} finally {
setLoading(false);
}
}

loadCycle();

}, []);

return {
cycle,
loading,
};
}

export function useDutyLogs(cycleId?: string) {
const [logs, setLogs] = useState<DutyLog[]>([]);
const [loading, setLoading] = useState(true);

const refresh = useCallback(async () => {
if (!cycleId) {
setLogs([]);
setLoading(false);
return;
}

setLoading(true);

try {
  const data = await promotionService.getDutyLogs(cycleId);
  setLogs(data);
} finally {
  setLoading(false);
}

}, [cycleId]);

useEffect(() => {
refresh();
}, [refresh]);

return {
logs,
loading,
refresh,
};
}

export function usePromotionResults(cycleId?: string) {
const [results, setResults] = useState<PromotionResult[]>([]);
const [loading, setLoading] = useState(true);

const refresh = useCallback(async () => {
if (!cycleId) {
setResults([]);
setLoading(false);
return;
}

setLoading(true);

try {
  const data = await promotionService.getPromotionResults(cycleId);
  setResults(data);
} finally {
  setLoading(false);
}

}, [cycleId]);

useEffect(() => {
refresh();
}, [refresh]);

return {
results,
loading,
refresh,
};
}