"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  User,
} from "lucide-react";

import { NewsCategory } from "@/data/home/news";

interface NewsCardProps {
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

export default function NewsCard({
  category,
  title,
  excerpt,
  author,
  publishedAt,
  image,
  href,
}: NewsCardProps) {
  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-xl
        hover:shadow-red-500/20
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[category]}`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{publishedAt}</span>
            </div>
          </div>

          {/* Read More */}
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-red-400 transition-colors duration-300 hover:text-red-300"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}