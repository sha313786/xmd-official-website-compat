import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { RankBadge } from "./rank-badge";
import { MemberAvatar } from "./member-avatar";
import { EditMemberDialog } from "./edit-member-dialog";
import { DeleteMemberDialog } from "./delete-member-dialog";

import { Member } from "@/types/member";

interface MemberCardProps {
  member: Member;
  onRefresh?: () => Promise<void>;
}

export function MemberCard({
  member,
  onRefresh,
}: MemberCardProps) {
  return (
    <Card className="transition-all duration-200 hover:border-red-500 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <MemberAvatar fullName={member.full_name} />

          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold">
              {member.full_name}
            </h3>

            <RankBadge rank={member.rank} />

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                {member.department}
              </span>

              <span className="rounded-full border px-3 py-1 text-xs">
                {member.badge_number}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <Link href={`/dashboard/members/${member.id}`}>
            <Button
              variant="outline"
              size="sm"
            >
              View
            </Button>
          </Link>

          {onRefresh && (
            <>
              <EditMemberDialog
                member={member}
                onSuccess={onRefresh}
              />

              <DeleteMemberDialog
                memberId={member.id}
                memberName={member.full_name}
                onSuccess={onRefresh}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}