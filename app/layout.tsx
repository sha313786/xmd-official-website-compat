import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://xmdofficial.com"),

  title: {
    default: "XMD Management Portal",
    template: "%s | XMD Management Portal",
  },

  description:
    "Official XLANTIS Medical Department Management Portal. Manage members, recruitment, promotions, reports, announcements, and medical operations from a unified dashboard.",

  applicationName: "XMD Management Portal",

  keywords: [
    "XMD",
    "XLANTIS",
    "XLANTIS Medical Department",
    "Medical Department",
    "EMS",
    "FiveM",
    "Roleplay",
    "Management Portal",
    "Recruitment",
    "Promotion Tracker",
    "Medical Services",
  ],

  authors: [
    {
      name: "XMD Development Team",
    },
  ],

  creator: "XMD Development Team",

  publisher: "XLANTIS Medical Department",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "XMD Management Portal",
    title: "XMD Management Portal",
    description:
      "Official XLANTIS Medical Department Management Portal.",

    images: [
      {
        url: "/images/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "XMD Management Portal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "XMD Management Portal",
    description:
      "Official XLANTIS Medical Department Management Portal.",

    images: ["/images/seo/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body>
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}