"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function AboutSettings() {
  const info = [
    {
      label: "Portal",
      value: "XMD Management Portal",
    },
    {
      label: "Version",
      value: "v1.0.0",
    },
    {
      label: "Next.js",
      value: "16",
    },
    {
      label: "React",
      value: "19",
    },
    {
      label: "TypeScript",
      value: "5",
    },
    {
      label: "Database",
      value: "Supabase",
    },
    {
      label: "Discord Bot",
      value: "SRB NEXUS",
    },
    {
      label: "Environment",
      value:
        process.env.NODE_ENV === "production"
          ? "Production"
          : "Development",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          About XMD Portal
        </CardTitle>

        <CardDescription>
          Application information and system details.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <span className="font-medium">
              {item.label}
            </span>

            <Badge variant="secondary">
              {item.value}
            </Badge>
          </div>
        ))}

        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-semibold">
            XMD Official
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Built for XLANTIS Medical Department with
            Next.js, React, TypeScript, Tailwind CSS,
            shadcn/ui, Supabase, and Discord Integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}