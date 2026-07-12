type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:bg-white/10 hover:shadow-xl hover:shadow-red-600/10">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl text-white">
        {icon}
      </div>

      <h3 className="mb-3 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}