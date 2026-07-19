"use client";

import { useEffect, useState } from "react";

interface LiveDurationProps {
  dutyStart: string;
}

export default function LiveDuration({
  dutyStart,
}: LiveDurationProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [now, setNow] = useState(() => Date.now());

useEffect(() => {
  const id = setInterval(() => {
    setNow(Date.now());
  }, 60000);

  return () => clearInterval(id);
}, []);

const start = new Date(dutyStart).getTime();
const diff = now - start;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <span>
      {hours}h {minutes}m {seconds}s
    </span>
  );
}
