import React from "react";
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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      {/* GPU Accelerated Sunbeam & Foliage Particle Canvas */}
      <AmbientCanvas />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Entrance Section */}
      <HeroSection />

      {/* Emotional Journey & Bio Section */}
      <StorySection />

      {/* Featured 3D Book Showcase */}
      <BookSection />

      {/* Interactive Poetry Sanctuary Experience */}
      <PoetryExperience />

      {/* Sanctuary Resources: Spotify, Mental Health, Church Finder */}
      <ResourcesSection />

      {/* Gatherings & Events */}
      <EventsSection />

      {/* Reader Reflections & Testimonials */}
      <TestimonialsSection />

      {/* Monthly Encouragement Newsletter */}
      <NewsletterSection />

      {/* Contact Form & Footer */}
      <ContactFooter />
    </main>
  );
}
