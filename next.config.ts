import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // /portfolio was linked externally (job applications) before the site
      // restructure — redirect it to the home page rather than 404.
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
