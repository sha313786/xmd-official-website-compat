"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiscordVerificationService } from "@/services/discord-verification-service";

export function DiscordVerificationCard() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleVerify() {
    setLoading(true);
    setMessage("");

    try {
      const result =
        await DiscordVerificationService.verifyCode(code);

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      await DiscordVerificationService.markVerified(
        result.data.id
      );

      setMessage("✅ Discord account linked successfully.");
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Link Discord Account
        </h2>

        <p className="text-sm text-muted-foreground">
          Run <strong>/verify</strong> in Discord and enter the
          6-digit code below.
        </p>
      </div>

      <Input
        maxLength={6}
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>

      {message && (
        <p className="text-sm">{message}</p>
      )}
    </div>
  );
}