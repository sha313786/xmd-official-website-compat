"use client";

import Reveal from "@/components/shared/reveal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { recruitmentFaqs } from "@/data/recruitment/faq";

export default function RecruitmentFaq() {
  return (
    <section className="py-20 bg-[#030508]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Inquiries
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
              Find answers to the most common questions regarding the XMD
              cadet intake and evaluation protocol.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 p-4 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <Accordion
              className="w-full space-y-3"
            >
              {recruitmentFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-white/5 bg-black/40 px-5 transition-colors hover:border-red-600/30"
                >
                  <AccordionTrigger className="text-left font-bold text-white hover:text-red-400 py-4 text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-zinc-300 leading-relaxed text-xs sm:text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}