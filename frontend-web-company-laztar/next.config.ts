import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // cho phép xuất ra static HTML
  basePath: "/web-company-laztar", // tên repo của bạn
  trailingSlash: true,
};

export default nextConfig;