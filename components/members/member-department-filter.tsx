interface MemberDepartmentFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const departments = [
  "All",
  "Management",
  "Emergency",
  "EMS",
  "Administration",
  "Operations",
];

export function MemberDepartmentFilter({
  value,
  onChange,
}: MemberDepartmentFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border bg-background px-4 py-2"
    >
      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}