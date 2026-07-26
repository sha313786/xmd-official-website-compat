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
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold">
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Find answers to the most common questions regarding the XMD
              recruitment process.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
         
            className="w-full"
        >
         
            {recruitmentFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground leading-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}