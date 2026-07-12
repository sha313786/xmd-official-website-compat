interface MemberSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MemberSearch({
  value,
  onChange,
}: MemberSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search members..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-background px-4 py-2 outline-none transition focus:border-red-500"
    />
  );
}