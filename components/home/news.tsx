"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FeaturedNews from "@/components/home/featured-news";
import NewsCard from "@/components/home/news-card";
import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import { newsData } from "@/data/home/news";

export default function News() {
  const featuredNews = newsData.find((item) => item.featured);
  const latestNews = newsData.filter((item) => !item.featured);

  return (
    <section
      id="news"
      className="bg-slate-950 py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs sm:text-sm font-medium text-red-400">
              Latest Updates
            </span>

            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              News & Announcements
            </h2>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-400">
              Stay informed with the latest medical operations, department announcements, and community updates from XMD.
            </p>
          </div>
        </Reveal>

        {/* Featured News */}
        {featuredNews && (
          <Reveal delay={100}>
            <div className="mb-8 sm:mb-12">
              <FeaturedNews
                category={featuredNews.category}
                title={featuredNews.title}
                excerpt={featuredNews.excerpt}
                author={featuredNews.author}
                publishedAt={featuredNews.publishedAt}
                image={featuredNews.image}
                href={featuredNews.href}
              />
            </div>
          </Reveal>
        )}

        {/* Other News */}
        <Stagger
          className="grid auto-rows-fr gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          baseDelay={200}
        >
          {latestNews.map((news) => (
            <NewsCard
              key={news.id}
              category={news.category}
              title={news.title}
              excerpt={news.excerpt}
              author={news.author}
              publishedAt={news.publishedAt}
              image={news.image}
              href={news.href}
            />
          ))}
        </Stagger>

        {/* Bottom CTA */}
        <Reveal delay={400}>
          <div className="mt-10 sm:mt-16 text-center">
            <Link
              href="/news"
              className="
                w-full sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-8
                py-3.5 sm:py-4
                font-semibold
                text-red-400
                transition-all
                duration-300
                hover:border-red-500/40
                hover:bg-red-600
                hover:text-white
                hover:shadow-xl
                hover:shadow-red-600/20
                active:scale-98
              "
            >
              <span>View All News</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}