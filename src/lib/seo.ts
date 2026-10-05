import type { Metadata } from "next";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "./site";

export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
}

// One place that builds the canonical URL, the Open Graph card and the Twitter
// card, so a page can never end up sharing the home page's preview by accident.
export function pageMetadata({ title, description, path, image, type = "website", publishedTime }: PageSeo): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  // Don't repeat her name when the title already contains it ("About Kalandice Thomas").
  const fullTitle = path === "/" || title.includes(AUTHOR_NAME) ? title : `${title} | ${AUTHOR_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt: `${title} — ${AUTHOR_NAME}` }],
      ...(type === "article"
        ? { publishedTime: publishedTime ?? undefined, authors: [AUTHOR_NAME] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// Structured data helps Google show richer results (author details, book info,
// article dates). Rendered through a <script type="application/ld+json">.
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: "Author & Poet",
    description:
      "Christian poet and author of Encouraging Poetics, writing about hope, healing and faith through anxiety, waiting and loss.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Texas Woman's University" },
    image: `${SITE_URL}/images/author-reading-field.webp`,
    // Only profiles we can verify. Add her Amazon author page and a working
    // Facebook URL here once confirmed — bad sameAs links hurt more than help.
    sameAs: ["https://www.instagram.com/encouragingpoetics"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Finding Hope. Healing Through Faith. One Poem At A Time.",
    inLanguage: "en-US",
    author: { "@type": "Person", name: AUTHOR_NAME },
  };
}

export function bookSchema(book: { title: string; description: string; cover_image: string | null; buy_url: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    description: book.description,
    bookFormat: "https://schema.org/Paperback",
    inLanguage: "en",
    url: `${SITE_URL}/book`,
    ...(book.cover_image ? { image: book.cover_image.startsWith("http") ? book.cover_image : `${SITE_URL}${book.cover_image}` } : {}),
    ...(book.buy_url ? { offers: { "@type": "Offer", url: book.buy_url, availability: "https://schema.org/InStock" } } : {}),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  published_at: string | null;
  updated_at: string;
  cover_image: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    image: post.cover_image
      ? post.cover_image.startsWith("http")
        ? post.cover_image
        : `${SITE_URL}${post.cover_image}`
      : `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  };
}

// Only events with a real calendar date qualify; Google rejects Event markup without one.
export function eventSchema(event: { title: string; description: string; location: string; event_date: string; link_url: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.event_date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.location, address: event.location },
    performer: { "@type": "Person", name: AUTHOR_NAME },
    organizer: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    ...(event.link_url ? { url: event.link_url } : { url: `${SITE_URL}/events` }),
  };
}
