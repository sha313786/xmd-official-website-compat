interface RankBadgeProps {
  rank: string;
}

const rankColors: Record<string, string> = {
  Director: "bg-red-600 text-white",
  Chief: "bg-red-500 text-white",
  "Assistant Chief": "bg-orange-500 text-white",

  "Medical Supervisor": "bg-blue-600 text-white",
  "Medical Officer": "bg-blue-500 text-white",

  "Senior Specialist": "bg-indigo-600 text-white",
  "Senior Surgeon": "bg-purple-600 text-white",
  Surgeon: "bg-purple-500 text-white",
  "Assistant Surgeon": "bg-purple-400 text-white",

  "Senior Doctor": "bg-green-600 text-white",
  Doctor: "bg-green-500 text-white",
  "Junior Doctor": "bg-green-400 text-white",

  "Senior Consultant": "bg-cyan-600 text-white",
  Consultant: "bg-cyan-500 text-white",

  "Head Nurse": "bg-pink-600 text-white",
  Nurse: "bg-pink-500 text-white",

  Paramedic: "bg-yellow-500 text-black",
  Trainee: "bg-gray-500 text-white",
  "Community Care": "bg-slate-500 text-white",
};

export function RankBadge({ rank }: RankBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        rankColors[rank] ?? "bg-gray-300 text-black"
      }`}
    >
      {rank}
    </span>
  );
}