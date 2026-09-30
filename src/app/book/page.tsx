import type { Metadata } from "next";
import { BookView } from "@/components/pages/BookView";
import { getFeaturedBook } from "@/lib/content/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Encouraging Poetics — The Book",
  description:
    "Encouraging Poetics by Kalandice Thomas: a published collection of faith-filled poetry for seasons of anxiety, waiting, loss, and love. Order your copy today.",
  alternates: { canonical: "/book" },
};

export default async function BookPage() {
  const { featured, others } = await getFeaturedBook();
  return <BookView book={featured} others={others} />;
}
