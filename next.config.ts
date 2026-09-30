import type { NextConfig } from "next";

// Allow next/image to optimize images uploaded through the admin dashboard
// (Supabase Storage public bucket).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/**`)] : [],
  },
};

export default nextConfig;
