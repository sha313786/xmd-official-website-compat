import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | XMD Official",
  description: "Terms of Service for the XMD Official Discord Bot and Management Portal.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <p className="mb-6 text-muted-foreground">
        Effective Date: July 21, 2026
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance</h2>
          <p>
            By using the XMD Official Discord Bot and Management Portal, you
            agree to these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Purpose</h2>
          <p>
            XMD Official is designed for XLANTIS Medical Department management,
            including recruitment, duty tracking, promotion management,
            verification, reporting, and server administration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Acceptable Use</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Do not misuse or abuse the bot.</li>
            <li>Do not attempt unauthorized access.</li>
            <li>Follow Discord's Terms of Service.</li>
            <li>Comply with server rules.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Availability</h2>
          <p>
            We strive to provide reliable service but do not guarantee
            uninterrupted availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
          <p>
            We may suspend or terminate access for abuse, misuse, or violations
            of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Contact</h2>
          <p>
            For questions regarding these Terms, contact the XMD Management
            Team through the official Discord server.
          </p>
        </section>
      </div>
    </main>
  );
}