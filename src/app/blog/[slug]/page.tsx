import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { CmsImage } from "@/components/CmsImage";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/content/queries";
import { formatDate, parseContent, readTime } from "@/lib/content/format";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Devotional not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at ?? undefined,
      authors: ["Kalandice Thomas"],
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const blocks = parseContent(post.content);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F8067] hover:text-[#193323] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Devotionals</span>
        </Link>

        {/* Post Metadata Header */}
        <header className="space-y-4 text-center">
          <span className="px-3.5 py-1 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold">
            {post.category}
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs text-[#536458] font-mono pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C9A44C]" />
              <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5F8067]" />
              {readTime(post.content)}
            </span>
          </div>
        </header>

        {post.cover_image && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md border-4 border-white">
            <CmsImage src={post.cover_image} alt={post.title} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          </div>
        )}

        {/* Scripture Spotlight Banner */}
        {post.scripture && (
          <div className="p-6 rounded-2xl bg-white border border-[#C9A44C]/40 shadow-xs text-center">
            <p className="font-serif-luxury italic text-base text-[#193323]">&ldquo;{post.scripture}&rdquo;</p>
          </div>
        )}

        {/* Full Essay Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md space-y-6 text-[#254631] text-base leading-relaxed font-serif-luxury whitespace-pre-line">
          {blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="text-2xl font-bold text-[#193323] pt-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote key={i} className="p-6 rounded-2xl bg-[#193323] text-[#FAF7F2] italic text-lg shadow-inner">
                  &ldquo;{block.text}&rdquo;
                </blockquote>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        {/* Author Bio Footer Block */}
        <div className="p-6 rounded-2xl bg-white border border-[#5F8067]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[#C9A44C] shrink-0">
            <Image src="/images/logo.webp" alt="Kalandice Thomas" fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <p className="font-serif-luxury font-bold text-sm text-[#193323]">Written by Kalandice Thomas</p>
            <p className="text-xs text-[#536458]">Author of Encouraging Poetics • TWU Graduate • Encouragement Minister</p>
          </div>
        </div>
      </article>

      <ContactFooter />
    </main>
  );
}
