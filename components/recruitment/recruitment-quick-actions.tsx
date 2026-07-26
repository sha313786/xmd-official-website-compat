"use client";

import Link from "next/link";

import {
  Globe,
  FileText,
  Settings,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Public Recruitment",
    description: "View the public recruitment page.",
    href: "/recruitment",
    icon: Globe,
  },
  {
    title: "Applications",
    description: "Review submitted applications.",
    href: "/dashboard/recruitment/applications",
    icon: FileText,
  },
  {
    title: "Settings",
    description: "Manage recruitment settings.",
    href: "/dashboard/recruitment/settings",
    icon: Settings,
  },
];

export function RecruitmentQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted"
            >
              <div className="rounded-lg bg-muted p-3">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium">
                  {action.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}