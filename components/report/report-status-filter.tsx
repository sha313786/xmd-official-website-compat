"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReportStatusFilter({
  value,
  onChange,
}: ReportStatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="Open">Open</SelectItem>
        <SelectItem value="In Progress">
          In Progress
        </SelectItem>
        <SelectItem value="Resolved">
          Resolved
        </SelectItem>
        <SelectItem value="Closed">
          Closed
        </SelectItem>
      </SelectContent>
    </Select>
  );
}