import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XMD Management Portal",
  description: "XMD Management Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
  <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
  {/* Dashboard content */}
</div>
}