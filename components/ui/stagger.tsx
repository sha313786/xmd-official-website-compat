"use client";

import { ReactNode } from "react";

import Reveal from "@/components/ui/reveal";

interface StaggerProps {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function Stagger({
  children,
  className = "",
  baseDelay = 0,
  staggerDelay = 100,
  duration = 600,
  distance = 30,
  once = true,
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal
          key={index}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          distance={distance}
          once={once}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}