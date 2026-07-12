"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportPriorityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReportPriorityFilter({
  value,
  onChange,
}: ReportPriorityFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Priorities</SelectItem>
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
        <SelectItem value="Critical">
          Critical
        </SelectItem>
      </SelectContent>
    </Select>
  );
}