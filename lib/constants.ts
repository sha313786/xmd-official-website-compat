import {
  Ambulance,
  HeartPulse,
  Hospital,
  Pill,
  Stethoscope,
  Syringe,
} from "lucide-react";

export const siteConfig = {
  name: "XMD Management Portal",
  shortName: "XMD",
  organization: "Xlantis Medical Department",

  description:
    "Official XMD Management Portal for member management, recruitment, reports, promotion tracking, and duty management.",

  logo: "/images/logo.png",

  url: "http://localhost:3000",

  links: {
    discord: "",
    github: "",
    website: "",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Services", href: "/services" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Contact", href: "/contact" },
] as const;

export const departments = [
  { title: "Emergency" },
  { title: "Surgery" },
  { title: "Cardiology" },
  { title: "Pediatrics" },
  { title: "Radiology" },
  { title: "Laboratory" },
] as const;

export const services = [
  {
    title: "Emergency Response",
    description: "24/7 emergency medical response across Xlantis City.",
    icon: Ambulance,
  },
  {
    title: "Critical Care",
    description: "Advanced life-saving treatment for critical patients.",
    icon: HeartPulse,
  },
  {
    title: "Hospital Services",
    description: "Professional healthcare with experienced medical staff.",
    icon: Hospital,
  },
  {
    title: "Pharmacy",
    description: "Medication and treatment support for every patient.",
    icon: Pill,
  },
  {
    title: "Vaccination",
    description: "Preventive healthcare and immunization programs.",
    icon: Syringe,
  },
  {
    title: "Medical Consultation",
    description: "Expert consultation and diagnosis from qualified doctors.",
    icon: Stethoscope,
  },
] as const;