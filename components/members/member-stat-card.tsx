interface MemberStatCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}

export function MemberStatCard({
  label,
  value,
  valueClassName,
}: MemberStatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 transition hover:border-red-500">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-bold ${
          valueClassName ?? ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}