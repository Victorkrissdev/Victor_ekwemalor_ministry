import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Next.js this folder is the project root
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
