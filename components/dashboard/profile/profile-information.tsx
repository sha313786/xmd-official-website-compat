import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/types/member";

type ProfileInformationProps = {
  member: Member;
};

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div>
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value || "-"}
      </p>
    </div>
  );
}

export default function ProfileInformation({
  member,
}: ProfileInformationProps) {
  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="p-6">
        <h2 className="mb-6 text-xl font-bold">
          Member Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoItem
            label="Department"
            value={member.department}
          />

          <InfoItem
            label="Rank"
            value={member.rank}
          />

          <InfoItem
            label="Badge Number"
            value={member.badgeNumber}
          />

          <InfoItem
            label="Discord ID"
            value={member.discordId}
          />

          <InfoItem
            label="Join Date"
            value={member.joinedAt}
          />

          <InfoItem
            label="Status"
             value="Active"
          />
        </div>
      </CardContent>
    </Card>
  );
}