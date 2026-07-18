import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "XMD Management Portal",
    short_name: "XMD",
    description:
      "Official XLANTIS Medical Department Management Portal.",

    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#dc2626",

    orientation: "portrait",

    lang: "en",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}