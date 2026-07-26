"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 600,
  distance = 30,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
  const id = requestAnimationFrame(() => {
    setIsVisible(true);
  });

  return () => cancelAnimationFrame(id);
}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(${distance}px)`,

        transition: `
          opacity ${duration}ms ease-out ${delay}ms,
          transform ${duration}ms ease-out ${delay}ms
        `,

        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}