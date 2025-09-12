import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ahgnodmik.github.io";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: undefined,
  assetPrefix: undefined,
};

export default nextConfig;
