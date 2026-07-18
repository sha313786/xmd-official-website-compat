import {
  Ambulance,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

export interface RecruitmentFeature {
  id: number;
  icon: typeof Ambulance;
  title: string;
  description: string;
}

export interface RecruitmentStep {
  id: number;
  title: string;
  description: string;
}

export const recruitmentContent = {
  badge: "Join XMD",
  title: "Become Part of XLANTIS Medical Department",
  description:
    "Join one of the most professional emergency medical departments in XLANTIS City. Train with experienced staff, serve the community, and grow your medical career.",

  primaryButton: {
    label: "Apply Now",
    href: "/recruitment",
  },

  secondaryButton: {
    label: "Requirements",
    href: "#requirements",
  },
};

export const recruitmentFeatures: RecruitmentFeature[] = [
  {
    id: 1,
    icon: Ambulance,
    title: "Professional Medical Training",
    description:
      "Learn emergency medicine and patient care through structured training programs.",
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "Promotion Opportunities",
    description:
      "Progress through the ranks with performance-based promotions and recognition.",
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Participate in regular training sessions, drills, and medical workshops.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Supportive Community",
    description:
      "Work alongside dedicated professionals in a collaborative environment.",
  },
];

export const recruitmentProcess: RecruitmentStep[] = [
  {
    id: 1,
    title: "Application",
    description: "Submit your recruitment application.",
  },
  {
    id: 2,
    title: "Interview",
    description: "Attend an interview with the recruitment team.",
  },
  {
    id: 3,
    title: "Training",
    description: "Complete the trainee program successfully.",
  },
  {
    id: 4,
    title: "Evaluation",
    description: "Pass practical and theoretical assessments.",
  },
  {
    id: 5,
    title: "Welcome to XMD",
    description: "Begin serving as an active medical professional.",
  },
];