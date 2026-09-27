"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, X, Clock, UserCheck, UserX } from "lucide-react";

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
import { RejectApplicationDialog } from "@/components/recruitment/reject-application-dialog";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { profile } = useProfile();
  const {
    application,
    loading,
    approve,
    reject,
    updateInterviewStatus,
  } = useApplication(id);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const { member: reviewer } = useMember(application?.reviewed_by);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading application...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-6">
        <p>Application not found.</p>
      </div>
    );
  }

  const handleApprove = async () => {
    await approve(profile?.id ?? null);
  };

  const handleConfirmReject = async (reason: string) => {
    await reject(profile?.id ?? null, reason);
  };

  const handleInterviewStatus = async (
    status: "pending" | "passed" | "failed" | "no_show"
  ) => {
    await updateInterviewStatus(status);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/recruitment">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold">{application.full_name}</h1>
          <p className="text-muted-foreground">
            Recruitment application details
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p>{application.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Character Name</p>
              <p>{application.character_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Real Age</p>
              <p>{application.real_age}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Discord ID</p>
              <p>{application.discord_id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roleplay Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Medical Experience
              </p>
              <p>{application.medical_experience}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Current Occupation
              </p>
              <p>{application.current_occupation || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gang Member</p>
              <p>
                {application.gang_member
                  ? application.gang_name || "Yes"
                  : "No"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Preferred Shift</p>
              <p>{application.preferred_shift}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours Per Day</p>
              <p>{application.hours_per_day}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Why Join?</p>
              <p className="text-sm text-muted-foreground">
                {application.why_join}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Why Choose You?</p>
              <p className="text-sm text-muted-foreground">
                {application.why_choose_you}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Strengths</p>
              <p className="text-sm text-muted-foreground">
                {application.strengths}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Weaknesses</p>
              <p className="text-sm text-muted-foreground">
                {application.weaknesses}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Patient Scenario</p>
              <p className="text-sm text-muted-foreground">
                {application.patient_scenario}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Declaration</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant={application.declaration ? "default" : "destructive"}>
            {application.declaration
              ? "Declaration Accepted"
              : "Declaration Not Accepted"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Management Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge>{application.status}</Badge>
          </div>

          {application.reviewed_by && (
            <div>
              <p className="text-sm text-muted-foreground">Reviewed By</p>
              <p>
                {reviewer?.fullName ||
                  application.reviewed_by}
              </p>
            </div>
          )}

          {application.review_notes && (
            <div className={`rounded-lg border p-4 space-y-1.5 ${
              application.status === "rejected"
                ? "border-red-500/20 bg-red-500/5 text-red-200"
                : "border-border bg-muted/40"
            }`}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${
                application.status === "rejected" ? "text-red-400" : "text-muted-foreground"
              }`}>
                {application.status === "rejected" ? "Rejection Reason (Sent to Applicant via DM)" : "Review Notes"}
              </p>
              <p className="text-sm whitespace-pre-wrap">{application.review_notes}</p>
            </div>
          )}

          {application.status === "pending" && (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="mr-2 h-4 w-4" />
                Approve Application
              </Button>

              <Button variant="destructive" onClick={() => setRejectDialogOpen(true)}>
                <X className="mr-2 h-4 w-4" />
                Reject Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {application.status === "approved" && (
        <Card>
          <CardHeader>
            <CardTitle>Interview Result</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Interview Status:
              </span>
              <Badge>{application.interview_status}</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant={
                  application.interview_status === "passed"
                    ? "default"
                    : "outline"
                }
                onClick={() => handleInterviewStatus("passed")}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Pass Interview
              </Button>

              <Button
                variant={
                  application.interview_status === "failed"
                    ? "destructive"
                    : "outline"
                }
                onClick={() => handleInterviewStatus("failed")}
              >
                <UserX className="mr-2 h-4 w-4" />
                Fail Interview
              </Button>

              <Button
                variant={
                  application.interview_status === "no_show"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => handleInterviewStatus("no_show")}
              >
                <Clock className="mr-2 h-4 w-4" />
                No Show
              </Button>

              <Button
                variant={
                  application.interview_status === "pending"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => handleInterviewStatus("pending")}
              >
                Pending
              </Button>
            </div>

            {application.member_id ? (
              <div className="rounded-lg border p-4">
                <p className="font-medium">Member Created</p>
                <p className="text-sm text-muted-foreground">
                  This application is already linked to a member.
                </p>
                <p className="mt-1 text-sm">
                  Member ID: {application.member_id}
                </p>
              </div>
            ) : application.interview_status === "passed" ? (
              <div className="rounded-lg border p-4">
                <p className="font-medium">Interview Passed</p>
                <p className="text-sm text-muted-foreground">
                  The member creation process has been triggered automatically.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border p-4">
                <p className="font-medium">Member creation pending</p>
                <p className="text-sm text-muted-foreground">
                  The application must have a passed interview before a member
                  is created.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <RejectApplicationDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        applicantName={application.full_name}
        characterName={application.character_name}
        discordId={application.discord_id || undefined}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
}
