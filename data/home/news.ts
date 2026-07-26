import type { StaticImageData } from "next/image";

export type NewsCategory =
  | "Announcement"
  | "Recruitment"
  | "Training"
  | "Event"
  | "Emergency"
  | "Operations"
  | "Achievement";

export interface NewsItem {
  id: number;
  featured: boolean;
  category: NewsCategory;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  href: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    featured: true,
    category: "Announcement",
    title: "XMD Launches Advanced Emergency Response Unit",
    excerpt:
      "A new emergency response division has officially begun operations, improving medical coverage across XLANTIS City.",
    author: "XMD Administration",
    publishedAt: "16 Jul 2026",
    image: "/images/news/emergency-unit.jpg",
    href: "/news/emergency-response-unit",
  },
  {
    id: 2,
    featured: false,
    category: "Recruitment",
    title: "Applications Now Open",
    excerpt:
      "Recruitment has officially opened for new medical professionals. Apply now to join the XMD family.",
    author: "Recruitment Division",
    publishedAt: "14 Jul 2026",
    image: "/images/news/recruitment.jpg",
    href: "/news/recruitment-open",
  },
  {
    id: 3,
    featured: false,
    category: "Training",
    title: "Weekly Medical Training Completed",
    excerpt:
      "Medical staff completed this week's advanced emergency response and trauma care exercises.",
    author: "Training Division",
    publishedAt: "12 Jul 2026",
    image: "/images/news/training.jpg",
    href: "/news/weekly-training",
  },
  {
    id: 4,
    featured: false,
    category: "Achievement",
    title: "500 Successful Emergency Responses",
    excerpt:
      "XMD has successfully completed more than 500 emergency operations, reflecting our commitment to excellence.",
    author: "Operations Division",
    publishedAt: "10 Jul 2026",
    image: "/images/news/achievement.jpg",
    href: "/news/500-emergency-responses",
  },
];