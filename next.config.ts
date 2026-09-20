import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder assets in /public/images are hand-authored SVGs.
    // Safe because they are self-authored, not user-uploaded.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
