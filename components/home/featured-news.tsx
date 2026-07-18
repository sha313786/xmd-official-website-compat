"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  User,
} from "lucide-react";

import { NewsCategory } from "@/data/home/news";

interface FeaturedNewsProps {
  category: NewsCategory;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  href: string;
}

const categoryStyles: Record<NewsCategory, string> = {
  Announcement:
    "border-red-500/20 bg-red-500/10 text-red-400",

  Recruitment:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",

  Training:
    "border-green-500/20 bg-green-500/10 text-green-400",

  Event:
    "border-purple-500/20 bg-purple-500/10 text-purple-400",

  Emergency:
    "border-orange-500/20 bg-orange-500/10 text-orange-400",

  Operations:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",

  Achievement:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
};

export default function FeaturedNews({
  category,
  title,
  excerpt,
  author,
  publishedAt,
  image,
  href,
}: FeaturedNewsProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-red-500/40
        hover:shadow-2xl
        hover:shadow-red-500/20
      "
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden lg:h-96">
        <Image
        src={image}
        alt={title}
        fill
         priority
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1200px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <span
          className={`absolute left-6 top-6 rounded-full border px-4 py-2 text-sm font-semibold ${categoryStyles[category]}`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-10">
        <h2 className="text-3xl font-black leading-tight text-white lg:text-4xl">
          {title}
        </h2>

        <p className="mt-5 text-lg leading-8 text-slate-400">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {author}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {publishedAt}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30"
        >
          Read Full Article

          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}