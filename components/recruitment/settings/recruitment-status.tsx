"use client";

import { useState } from "react";

import { Power } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export function RecruitmentStatus() {
  const {
    settings,
    loading,
    toggleRecruitment,
  } = useRecruitmentSettings();

  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Status</CardTitle>
          <CardDescription>
            Loading recruitment settings...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Status</CardTitle>
          <CardDescription>
            Unable to load recruitment settings.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  async function handleToggle() {
    await toggleRecruitment();
    setOpen(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Status</CardTitle>

        <CardDescription>
          Control whether applications are accepted on the public recruitment page.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-semibold">
              Current Status
            </h3>

            <p className="text-sm text-muted-foreground">
              {settings.is_open
                ? "Applications are currently being accepted."
                : "Recruitment is currently closed."}
            </p>
          </div>

          <Badge
            className={
              settings.is_open
                ? "bg-green-600 hover:bg-green-600"
                : "bg-red-600 hover:bg-red-600"
            }
          >
            {settings.is_open ? "OPEN" : "CLOSED"}
          </Badge>
        </div>

        {settings.is_open ? (
          <AlertDialog
            open={open}
            onOpenChange={setOpen}
          >
            <AlertDialogTrigger
  render={
    <Button
      variant="destructive"
      className="w-full"
    >
      <Power className="mr-2 h-4 w-4" />
      Close Recruitment
    </Button>
  }
/>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Close Recruitment?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This will immediately stop new recruitment
                  applications from the public recruitment page.
                  Existing applications will remain available for
                  review.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleToggle}
                >
                  Close Recruitment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            className="w-full"
            onClick={handleToggle}
          >
            <Power className="mr-2 h-4 w-4" />
            Open Recruitment
          </Button>
        )}
      </CardContent>
    </Card>
  );
}