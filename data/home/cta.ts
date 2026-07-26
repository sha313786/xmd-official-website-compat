import {
  Activity,
  Ambulance,
  Building2,
  Users,
} from "lucide-react";

export interface CTAButton {
  label: string;
  href: string;
}

export interface CTAContent {
  badge: string;
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton: CTAButton;
}

export interface CTAStat {
  id: number;
  icon: typeof Activity;
  value: string;
  label: string;
}

export const ctaContent: CTAContent = {
  badge: "Join XLANTIS Medical Department",

  title: "Ready to Save Lives?",

  description:
    "Become part of XLANTIS Medical Department and work alongside highly trained professionals dedicated to protecting and serving the citizens of XLANTIS City. Start your medical journey today.",

  primaryButton: {
    label: "Apply Now",
    href: "/recruitment",
  },

  secondaryButton: {
    label: "Contact XMD",
    href: "/contact",
  },
};

export const ctaStats: CTAStat[] = [
  {
    id: 1,
    icon: Users,
    value: "80+",
    label: "Active Members",
  },
  {
    id: 2,
    icon: Ambulance,
    value: "24/7",
    label: "Emergency Response",
  },
  {
    id: 3,
    icon: Building2,
    value: "6",
    label: "Medical Divisions",
  },
  {
    id: 4,
    icon: Activity,
    value: "100%",
    label: "Team Commitment",
  },
];