"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Report } from "@/types";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z
    .string()
    .min(10, "Description is required"),

  memberName: z
    .string()
    .min(2, "Member name is required"),

  reportType: z.enum([
    "General",
    "Duty",
    "Disciplinary",
    "Complaint",
    "Suggestion",
    "Other",
  ]),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
    "Critical",
  ]),

  status: z.enum([
    "Open",
    "In Progress",
    "Resolved",
    "Closed",
  ]),

  assignedTo: z.string().optional(),

  createdBy: z
    .string()
    .min(2, "Created By is required"),
});

type FormValues = z.infer<typeof schema>;

interface AddReportDialogProps {
  createReport: (
    report: Omit<
      Report,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<Report>;

  onCreated?: () => void;
}

export function AddReportDialog({
  createReport,
  onCreated,
}: AddReportDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      title: "",
      description: "",
      memberName: "",
      reportType: "General",
      priority: "Medium",
      status: "Open",
      assignedTo: "",
      createdBy: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await createReport(values);

      form.reset();
      setOpen(false);

      onCreated?.();
    } catch (error) {
      console.error("Create report failed:", error);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Report
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Create Report
            </DialogTitle>

            <DialogDescription>
              Submit a new report for review.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
              )}
              className="space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Report title"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Member Name
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Member name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Assigned To
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Optional"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>
                        Description
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Describe the report..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Report Type
                      </FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={
                          field.onChange
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="General">
                            General
                          </SelectItem>

                          <SelectItem value="Duty">
                            Duty
                          </SelectItem>

                          <SelectItem value="Disciplinary">
                            Disciplinary
                          </SelectItem>

                          <SelectItem value="Complaint">
                            Complaint
                          </SelectItem>

                          <SelectItem value="Suggestion">
                            Suggestion
                          </SelectItem>

                          <SelectItem value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Priority
                      </FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={
                          field.onChange
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Low">
                            Low
                          </SelectItem>

                          <SelectItem value="Medium">
                            Medium
                          </SelectItem>

                          <SelectItem value="High">
                            High
                          </SelectItem>

                          <SelectItem value="Critical">
                            Critical
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Status
                      </FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={
                          field.onChange
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Open">
                            Open
                          </SelectItem>

                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>

                          <SelectItem value="Resolved">
                            Resolved
                          </SelectItem>

                          <SelectItem value="Closed">
                            Closed
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createdBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Created By
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    form.formState
                      .isSubmitting
                  }
                >
                  {form.formState
                    .isSubmitting
                    ? "Creating..."
                    : "Create Report"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}