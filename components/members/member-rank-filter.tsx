interface MemberRankFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ranks = [
  "All",
  "Director",
  "Chief",
  "Assistant Chief",
  "Medical Supervisor",
  "Medical Officer",
  "Senior Specialist",
  "Senior Surgeon",
  "Surgeon",
  "Assistant Surgeon",
  "Senior Doctor",
  "Doctor",
  "Junior Doctor",
  "Senior Consultant",
  "Consultant",
  "Head Nurse",
  "Nurse",
  "Paramedic",
  "Trainee",
  "Community Care",
];

export function MemberRankFilter({
  value,
  onChange,
}: MemberRankFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border bg-background px-4 py-2"
    >
      {ranks.map((rank) => (
        <option key={rank} value={rank}>
          {rank}
        </option>
      ))}
    </select>
  );
}