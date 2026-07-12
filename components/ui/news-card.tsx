type NewsCardProps = {
  title: string;
  date: string;
  description: string;
};

export default function NewsCard({
  title,
  date,
  description,
}: NewsCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-600/10">
      <div className="h-48 bg-gradient-to-br from-red-700 to-red-500"></div>

      <div className="p-6">
        <p className="text-sm text-red-400">{date}</p>

        <h3 className="mt-3 text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-400">
          {description}
        </p>

        <button className="mt-6 text-red-500 transition hover:text-red-400">
          Read More →
        </button>
      </div>
    </div>
  );
}