import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/web-company-laztar", // tên repo của bạn
  trailingSlash: true,
  // output: "export",
  images: {
    unoptimized: true, // ✅ tắt tối ưu hóa ảnh
  },
  experimental: {
    optimizeCss: false // Tắt LightningCSS
  }
};

export default nextConfig;