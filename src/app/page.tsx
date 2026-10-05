import React from "react";
import type { Metadata } from "next";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { Navbar } from "@/components/sanctuary/Navbar";
import { HeroSection } from "@/components/sanctuary/HeroSection";
import { StorySection } from "@/components/sanctuary/StorySection";
import { BookSection } from "@/components/sanctuary/BookSection";
import { PoetryExperience } from "@/components/sanctuary/PoetryExperience";
import { ResourcesSection } from "@/components/sanctuary/ResourcesSection";
import { EventsSection } from "@/components/sanctuary/EventsSection";
import { TestimonialsSection } from "@/components/sanctuary/TestimonialsSection";
import { NewsletterSection } from "@/components/sanctuary/NewsletterSection";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { getFeaturedBook, getNewsletterSettings, getResources, getTestimonials, getUpcomingEvents } from "@/lib/content/queries";
import { pageMetadata, personSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Kalandice Thomas | Encouraging Poetics - Digital Sanctuary",
  description:
    "A place of peace, hope, healing and encouragement from author Kalandice Thomas. Finding Hope. Healing Through Faith. One Poem At A Time.",
  path: "/",
});

// Cached and refreshed hourly; saving in the admin dashboard refreshes it immediately.
export const revalidate = 3600;

export default async function Home() {
  const [{ featured }, events, resources, testimonials, newsletter] = await Promise.all([
    getFeaturedBook(),
    getUpcomingEvents(),
    getResources(),
    getTestimonials(),
    getNewsletterSettings(),
  ]);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <JsonLd data={[websiteSchema(), personSchema()]} />

      {/* GPU Accelerated Sunbeam & Foliage Particle Canvas */}
      <AmbientCanvas />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Entrance Section */}
      <HeroSection />

      {/* Emotional Journey & Bio Section */}
      <StorySection />

      {/* Featured 3D Book Showcase */}
      <BookSection book={featured} />

      {/* Interactive Poetry Sanctuary Experience */}
      <PoetryExperience />

      {/* Sanctuary Resources: Spotify, Mental Health, Church Finder */}
      <ResourcesSection resources={resources} />

      {/* Gatherings & Events */}
      <EventsSection events={events} />

      {/* Reader Reflections & Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Monthly Encouragement Newsletter */}
      <NewsletterSection settings={newsletter} />

      {/* Contact Form & Footer */}
      <ContactFooter />
    </main>
  );
}
