type SectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-medical-blue">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">{title}</h2>
    </div>
  );
}
