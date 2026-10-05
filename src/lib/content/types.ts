export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  scripture: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
}

export interface SiteEvent {
  id: string;
  title: string;
  category: string;
  location: string;
  date_label: string;
  time_label: string;
  event_date: string | null;
  description: string;
  link_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
}

export type BookStatus = "available" | "coming_soon";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scripture: string;
  cover_image: string | null;
  buy_url: string | null;
  buy_label: string;
  themes: string[];
  status: BookStatus;
  featured: boolean;
  sort_order: number;
  published: boolean;
}

export type ResourceKind = "playlist" | "mental_health" | "faith";

export interface Resource {
  id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  url: string;
  tag: string;
  sort_order: number;
  published: boolean;
}

export type MessageKind = "general" | "prayer" | "speaking";

export interface Message {
  id: string;
  kind: MessageKind;
  name: string;
  email: string;
  organization: string;
  location: string;
  event_date: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export type ResourceGroups = Record<ResourceKind, Resource[]>;

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  sort_order: number;
  published: boolean;
}

export interface NewsletterSettings {
  eyebrow: string;
  heading: string;
  intro: string;
  placeholder: string;
  button_label: string;
  success_message: string;
}
