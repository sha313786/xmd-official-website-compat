import {
  Ambulance,
  Building2,
  HeartPulse,
  Pill,
} from "lucide-react";

export interface ServiceItem {
  id: number;
  icon: typeof Ambulance;
  title: string;
  description: string;
  href: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    icon: Ambulance,
    title: "Emergency Care",
    description:
      "Rapid emergency medical response available 24/7 for critical situations.",
    href: "/services/emergency",
  },
  {
    id: 2,
    icon: Building2,
    title: "Hospital Care",
    description:
      "Professional inpatient and outpatient medical services with advanced facilities.",
    href: "/services/hospital",
  },
  {
    id: 3,
    icon: HeartPulse,
    title: "Medical Consultation",
    description:
      "Expert diagnosis, treatment planning, and comprehensive patient care.",
    href: "/services/consultation",
  },
  {
    id: 4,
    icon: Pill,
    title: "Pharmacy Support",
    description:
      "Essential medicines, prescriptions, and pharmaceutical assistance.",
    href: "/services/pharmacy",
  },
];