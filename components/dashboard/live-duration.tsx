"use client";

import { useEffect, useState } from "react";

interface LiveDurationProps {
  dutyStart: string;
}

export default function LiveDuration({
  dutyStart,
}: LiveDurationProps) {
  const [now, setNow] = useState(() => Date.now());

  // Update every second for real-time duration
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const start = new Date(dutyStart).getTime();

  // Prevent negative durations
  const diff = Math.max(0, now - start);

  const totalSeconds = Math.floor(diff / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <span>
      {hours}h {minutes}m {seconds}s
    </span>
  );
}