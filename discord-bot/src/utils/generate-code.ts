const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVerificationCode(
  length = 8
): string {
  let code = "";

  for (let i = 0; i < length; i++) {
    code += CHARACTERS.charAt(
      Math.floor(Math.random() * CHARACTERS.length)
    );
  }

  return code;
}