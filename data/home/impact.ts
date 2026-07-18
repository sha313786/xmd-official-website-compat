import {
  Ambulance,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

export interface ImpactItem {
  id: number;
  icon: typeof Users;
  value: number;
  suffix?: string;
  title: string;
  description: string;
}

export const impactData: ImpactItem[] = [
  {
    id: 1,
    icon: Users,
    value: 80,
    suffix: "+",
    title: "Medical Staff",
    description:
      "Dedicated professionals serving the community.",
  },
  {
    id: 2,
    icon: Ambulance,
    value: 24,
    suffix: "/7",
    title: "Emergency Response",
    description:
      "Always available when every second matters.",
  },
  {
    id: 3,
    icon: HeartHandshake,
    value: 500,
    suffix: "+",
    title: "Patients Treated",
    description:
      "Providing compassionate and professional care.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    value: 99,
    suffix: "%",
    title: "Success Rate",
    description:
      "Committed to excellence in medical services.",
  },
];