"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

import { useApplication } from "@/hooks/use-application";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/profile/use-profile";
import { useMember } from "@/hooks/member/use-member";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const {
  profile,
} = useProfile();

  const {
    application,
    loading,
    approve,
    reject,
  } = useApplication(params.id as string);
  const {
  member: reviewer,
} = useMember(
  application?.reviewed_by
);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Application not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      <Link href="/dashboard/recruitment/applications">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
      </Link>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Application Details
          </h1>

          <p className="text-muted-foreground">
            Review recruitment application.
          </p>

        </div>

        <Badge>
          {application.status.toUpperCase()}
        </Badge>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            Personal Information
          </CardTitle>

        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">

          <Info
            title="Full Name"
            value={application.full_name}
          />

          <Info
            title="Character Name"
            value={application.character_name}
          />

          <Info
            title="Age"
            value={application.real_age}
          />

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Roleplay Information
          </CardTitle>

        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">

          <Info
            title="Medical Experience"
            value={application.medical_experience}
          />

          <Info
            title="Occupation"
            value={
              application.current_occupation ??
              "-"
            }
          />

          <Info
            title="Gang Member"
            value={
              application.gang_member
                ? "Yes"
                : "No"
            }
          />

          <Info
            title="Gang Name"
            value={
              application.gang_name ??
              "-"
            }
          />

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Availability
          </CardTitle>

        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">

          <Info
            title="Preferred Shift"
            value={application.preferred_shift}
          />

          <Info
            title="Hours Per Day"
            value={application.hours_per_day}
          />

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Recruitment Questions
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <Question
            title="Why do you want to join XMD?"
            value={application.why_join}
          />

          <Question
            title="Why should we choose you?"
            value={application.why_choose_you}
          />

          <Question
            title="Strengths"
            value={application.strengths}
          />

          <Question
            title="Weaknesses"
            value={application.weaknesses}
          />

          <Question
            title="Patient Scenario"
            value={application.patient_scenario}
          />

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Declaration
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Badge
            variant={
              application.declaration
                ? "default"
                : "destructive"
            }
          >
            {application.declaration
              ? "Accepted"
              : "Not Accepted"}
          </Badge>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Management Review
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <Info
  title="Reviewed By"
  value={
    reviewer?.fullName ??
    "-"
  }
/>

          <Info
            title="Review Notes"
            value={
              application.review_notes ??
              "-"
            }
          />

          <div className="flex gap-3">

            {application.status === "pending" ? (
  <div className="flex gap-3">
    <Button
  onClick={() => {
    if (!profile) return;

    approve(profile.id);
  }}
>
      <Check className="mr-2 h-4 w-4" />
      Approve
    </Button>

    <Button
  variant="destructive"
  onClick={() => {
    if (!profile) return;

    reject(profile.id);
  }}
>
      <X className="mr-2 h-4 w-4" />
      Reject
    </Button>
  </div>
) : (
  <Badge
    variant={
      application.status === "approved"
        ? "default"
        : "destructive"
    }
  >
    {application.status === "approved"
      ? "Application Approved"
      : "Application Rejected"}
  </Badge>
)}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}

function Question({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 font-medium">
        {title}
      </p>

      <div className="rounded-lg border bg-muted/30 p-4">
        {value}
      </div>
    </div>
  );
}