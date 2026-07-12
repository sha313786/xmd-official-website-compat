interface MemberAvatarProps {
  fullName: string;
}

export function MemberAvatar({
  fullName,
}: MemberAvatarProps) {
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
      {initials}
    </div>
  );
}