import {
  Ambulance,
  HeartPulse,
  Hospital,
  Pill,
  Syringe,
  Stethoscope,
} from "lucide-react";

import ServiceCard from "@/components/ui/service-card";

export default function Services() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            Our Medical Services
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-red-600"></div>

          <p className="mt-6 text-slate-400">
            Comprehensive emergency and healthcare services
            provided by XMD professionals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <ServiceCard
            icon={<Ambulance size={30} />}
            title="Emergency Response"
            description="24/7 emergency medical response across Xlantis City."
          />

          <ServiceCard
            icon={<HeartPulse size={30} />}
            title="Critical Care"
            description="Advanced life-saving treatment for critical patients."
          />

          <ServiceCard
            icon={<Hospital size={30} />}
            title="Hospital Services"
            description="Professional healthcare with experienced medical staff."
          />

          <ServiceCard
            icon={<Pill size={30} />}
            title="Pharmacy"
            description="Medication and treatment support for every patient."
          />

          <ServiceCard
            icon={<Syringe size={30} />}
            title="Vaccination"
            description="Preventive healthcare and immunization programs."
          />

          <ServiceCard
            icon={<Stethoscope size={30} />}
            title="Medical Consultation"
            description="Expert consultation and diagnosis from qualified doctors."
          />
        </div>
      </div>
    </section>
  );
}