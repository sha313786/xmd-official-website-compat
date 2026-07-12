export class VerificationService {
  static async verifyMember(
    badgeNumber: string,
    verificationCode: string
  ) {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        badgeNumber,
        verificationCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Verification failed.");
    }

    return true;
  }
}