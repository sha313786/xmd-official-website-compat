"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { MemberProfile } from "@/types/member-dashboard";

interface MemberInformationProps {
  profile: MemberProfile;
}

export default function MemberInformation({
  profile,
}: MemberInformationProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex justify-center md:justify-start">
            <Image
              src={
                profile.avatarUrl ||
                "/images/default-avatar.png"
              }
              alt={profile.name}
              width={96}
              height={96}
              className="rounded-full border object-cover"
              priority
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {profile.name}
              </h2>

              <p className="text-muted-foreground">
                {profile.rank}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Callsign
                </p>

                <p className="font-medium">
                  {profile.callsign}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Department
                </p>

                <p className="font-medium">
                  {profile.department}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Discord ID
                </p>

                <p className="font-medium">
                  {profile.discordId}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Joined
                </p>

                <p className="font-medium">
                  {new Date(
                    profile.joinedAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <Badge
                  variant={
                    profile.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {profile.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}