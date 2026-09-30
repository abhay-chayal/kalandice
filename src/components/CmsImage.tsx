import Image, { type ImageProps } from "next/image";
import { SUPABASE_URL } from "@/lib/supabase/config";

// next/image for images whose URL comes from the CMS. Local files and Supabase
// Storage uploads are optimized; any other host is rendered as-is instead of
// throwing the "hostname not configured" error.
export function CmsImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  const optimizable = src.startsWith("/") || (SUPABASE_URL !== "" && src.startsWith(SUPABASE_URL));
  return <Image src={src} alt={alt} unoptimized={!optimizable} {...props} />;
}
