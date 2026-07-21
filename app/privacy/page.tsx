import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | XMD Official",
  description: "Privacy Policy for the XMD Official Discord Bot and Management Portal.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-6 text-muted-foreground">
        Effective Date: July 21, 2026
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Discord User ID</li>
            <li>Discord Server ID</li>
            <li>Duty logs</li>
            <li>Recruitment applications</li>
            <li>Promotion records</li>
            <li>Verification data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Information
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Duty management</li>
            <li>Recruitment processing</li>
            <li>Promotion tracking</li>
            <li>Server administration</li>
            <li>Verification</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Data Security
          </h2>

          <p>
            Data is securely stored and only accessible to authorized XMD
            management personnel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Third-Party Services
          </h2>

          <p>
            XMD Official uses Discord APIs and Supabase for authentication,
            database storage, and application functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact
          </h2>

          <p>
            If you have questions regarding this Privacy Policy, contact the
            XMD Management Team through the official Discord server.
          </p>
        </section>
      </div>
    </main>
  );
}