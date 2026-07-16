
import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/types/member";

type ProfileHeaderProps = {
  member: Member;
};

export default function ProfileHeader({
  member,
}: ProfileHeaderProps) {
  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="flex items-center gap-6 p-6">
        <img
          src={
            member.avatar ||
            "https://cdn.discordapp.com/embed/avatars/0.png"
         }
         alt={member.full_Name}
         className="h-24 w-24 rounded-full border border-white/10 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {member.full_Name}
          </h1>

          <p className="mt-2 text-slate-400">
            {member.rank}
          </p>

          <p className="text-slate-400">
            Badge #{member.badge_Number}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}