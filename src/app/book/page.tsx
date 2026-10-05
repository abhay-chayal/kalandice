import type { Metadata } from "next";
import { BookView } from "@/components/pages/BookView";
import { getFeaturedBook } from "@/lib/content/queries";
import { bookSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { featured } = await getFeaturedBook();
  return pageMetadata({
    title: featured ? featured.title : "The Book",
    description: featured
      ? featured.description.slice(0, 160)
      : "Encouraging Poetics by Kalandice Thomas - faith-filled poetry for seasons of anxiety, waiting, loss and love.",
    path: "/book",
    image: featured?.cover_image ?? null,
  });
}

export default async function BookPage() {
  const { featured, others } = await getFeaturedBook();
  return (
    <>
      {featured && <JsonLd data={bookSchema(featured)} />}
      <BookView book={featured} others={others} />
    </>
  );
}
