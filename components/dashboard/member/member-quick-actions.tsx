"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  User,
  Clock3,
  TrendingUp,
  FileText,
  RefreshCw,
} from "lucide-react";

interface MemberQuickActionsProps {
  onRefresh: () => void;
}

export default function MemberQuickActions({
  onRefresh,
}: MemberQuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Link href="/dashboard/profile" className="w-full">
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Link href="/dashboard/duty" className="w-full">
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <Clock3 className="mr-2 h-4 w-4" />
              Duty Logs
            </Button>
          </Link>

          <Link
            href="/dashboard/my-promotion"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Promotion
            </Button>
          </Link>

          <Button
            variant="outline"
            disabled
            className="justify-start"
          >
            <FileText className="mr-2 h-4 w-4" />
            Medical Report
          </Button>

          <Button
            onClick={onRefresh}
            className="justify-start"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}