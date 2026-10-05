import type { NextConfig } from "next";

// Allow next/image to optimize images uploaded through the admin dashboard
// (Supabase Storage public bucket). A malformed or missing NEXT_PUBLIC_SUPABASE_URL
// must never fail the build, so fall back to any Supabase project host.
function supabaseImagePattern() {
  const fallback = {
    protocol: "https" as const,
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  };

  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return fallback;

  try {
    const { protocol, hostname } = new URL(raw);
    if (protocol !== "https:" && protocol !== "http:") return fallback;
    return { protocol: protocol.replace(":", "") as "https" | "http", hostname, pathname: "/storage/v1/object/public/**" };
  } catch {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not a valid URL; using a wildcard image pattern instead.");
    return fallback;
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [supabaseImagePattern()],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop the browser second-guessing file types (a classic XSS vector).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Nobody should be able to frame her site inside theirs.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Send the page address to other sites, but never the query string.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site asks for none of these, so switch them off.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
