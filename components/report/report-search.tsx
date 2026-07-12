"use client";

import { Input } from "@/components/ui/input";

interface ReportSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReportSearch({
  value,
  onChange,
}: ReportSearchProps) {
  return (
    <Input
      placeholder="Search reports..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}