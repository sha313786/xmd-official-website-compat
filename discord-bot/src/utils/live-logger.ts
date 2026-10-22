export const liveLogs: string[] = [];

export function recordLiveLog(message: string) {
  const line = `[${new Date().toISOString()}] ${message}`;
  liveLogs.push(line);
  if (liveLogs.length > 50) liveLogs.shift();
  console.log(line);
}
