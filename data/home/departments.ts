import {
  Ambulance,
  Building2,
  GraduationCap,
  Plane,
  ShieldPlus,
  Briefcase,
} from "lucide-react";

export type DepartmentStatus =
  | "Active"
  | "Recruiting"
  | "Maintenance"
  | "Closed";

export interface DepartmentItem {
  id: number;
  icon: typeof Ambulance;
  name: string;
  description: string;
  chief: string;
  members: number;
  status: DepartmentStatus;
  href: string;
}

export const departmentsData: DepartmentItem[] = [
  {
    id: 1,
    icon: Ambulance,
    name: "Emergency Response",
    description:
      "Rapid emergency response and pre-hospital medical care.",
    chief: "Chief Medical Officer",
    members: 42,
    status: "Active",
    href: "/departments/emergency",
  },
  {
    id: 2,
    icon: ShieldPlus,
    name: "Trauma Unit",
    description:
      "Specialized treatment for critical injuries and emergencies.",
    chief: "Trauma Director",
    members: 18,
    status: "Active",
    href: "/departments/trauma",
  },
  {
    id: 3,
    icon: Building2,
    name: "Hospital Operations",
    description:
      "Daily hospital management and patient care services.",
    chief: "Hospital Administrator",
    members: 35,
    status: "Recruiting",
    href: "/departments/hospital",
  },
  {
    id: 4,
    icon: Plane,
    name: "Air Medical",
    description:
      "Rapid aerial transportation for emergency patients.",
    chief: "Flight Operations Lead",
    members: 12,
    status: "Active",
    href: "/departments/air-medical",
  },
  {
    id: 5,
    icon: GraduationCap,
    name: "Training Division",
    description:
      "Medical education, certification, and staff development.",
    chief: "Training Supervisor",
    members: 10,
    status: "Recruiting",
    href: "/departments/training",
  },
  {
    id: 6,
    icon: Briefcase,
    name: "Administration",
    description:
      "Operational planning, management, and departmental coordination.",
    chief: "Operations Manager",
    members: 8,
    status: "Active",
    href: "/departments/administration",
  },
];