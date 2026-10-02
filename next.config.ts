import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/projects/meutre-au-manoir",
        destination: "/en/projects/meurtre-au-manoir",
        permanent: true,
      },
      {
        source: "/projects/neo-travel",
        destination: "/en/projects/neo-travel",
        permanent: true,
      },
      {
        source: "/projects/enjoy-33",
        destination: "/en/projects/enjoy-33",
        permanent: true,
      },
      {
        source: "/projects/wehappers",
        destination: "/en/projects/we-happers",
        permanent: true,
      },
      {
        source: "/projects/naviroll",
        destination: "/en/projects/naviroll",
        permanent: true,
      },
      {
        source: "/projects/festivault",
        destination: "/en/projects/festivault",
        permanent: true,
      },
      {
        source: "/:locale(en|fr)/projects/meutre-au-manoir",
        destination: "/:locale/projects/meurtre-au-manoir",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
