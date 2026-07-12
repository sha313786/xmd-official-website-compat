interface DashboardStatCardProps {
  title: string;
  value: string | number;
}

export default function DashboardStatCard({
  title,
  value,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}