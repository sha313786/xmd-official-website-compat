import NewsCard from "@/components/ui/news-card";

export default function News() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            Latest News
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-red-600"></div>

          <p className="mt-6 text-slate-400">
            Stay updated with the latest announcements and events.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <NewsCard
            title="XMD Recruitment Open"
            date="July 2026"
            description="Applications are now open for aspiring medical professionals."
          />

          <NewsCard
            title="New Emergency Hospital"
            date="July 2026"
            description="XMD has expanded with a new emergency medical facility."
          />

          <NewsCard
            title="Promotion Ceremony"
            date="July 2026"
            description="Congratulations to all members promoted this month."
          />

        </div>

      </div>
    </section>
  );
}