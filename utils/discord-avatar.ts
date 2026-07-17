export function getDiscordAvatarUrl(
  discordId?: string,
  avatar?: string,
  size = 128
) {
  if (!discordId || !avatar) {
    return null;
  }

  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.webp?size=${size}`;
}