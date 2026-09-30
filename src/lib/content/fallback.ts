import type { Book, Post, Resource, SiteEvent, Testimonial } from "./types";

// Content shown when Supabase isn't configured yet (local dev, first deploy).
// supabase/seed.sql loads the same rows into the database so the site looks
// identical once the CMS is connected.

const seeded = "2026-08-01T00:00:00.000Z";

export const fallbackPosts: Post[] = [
  {
    id: "fallback-post-1",
    slug: "finding-peace-in-anxious-mornings",
    title: "Finding Peace in Anxious Mornings: Unclasping Control",
    category: "Overcoming Anxiety",
    excerpt:
      "When anxiety greets you before the alarm sounds, how do we return to God's quiet pastures? Reflections on surrendering control at dawn...",
    scripture: "Cast all your anxiety on Him because He cares for you. — 1 Peter 5:7",
    content: [
      "When we wake up to the quiet early light of morning, our hearts are often presented with a choice: will we carry yesterday's heavy anxieties, or will we step softly into the Shepherd's quiet pastures?",
      "Living in a fast-moving world can be precarious. Worry tells us to grip tighter, to scramble for answers, and to control outcomes. But Jesus invites us into a radically different posture—unclasping our hands and casting all our anxiety onto Him, because He cares for us with an unending, unwavering love.",
      "> The Lord is my shepherd; I lack nothing. He makes me lie down in green pastures, He leads me beside quiet waters, He refreshes my soul.",
      "Whatever waiting season or anxiety you are facing today, remember that your roots are growing deep in God's grace. Take a slow breath, rest your spirit in His promises, and trust that He is preparing something beautiful in His perfect timing.",
    ].join("\n\n"),
    cover_image: null,
    published: true,
    published_at: "2026-08-15T00:00:00.000Z",
    updated_at: seeded,
  },
  {
    id: "fallback-post-2",
    slug: "when-god-asks-you-to-wait",
    title: "When God Asks You to Wait: The Underground Work of Faith",
    category: "Faith in Waiting",
    excerpt:
      "Roots grow deepest in the dark, silent earth before the green shoot ever breaks through the surface. Understanding the sacred gift of waiting...",
    scripture: "They that wait upon the Lord shall renew their strength. — Isaiah 40:31",
    content:
      "Roots grow deepest in the dark, silent earth before the green shoot ever breaks through the surface. Understanding the sacred gift of waiting...",
    cover_image: null,
    published: true,
    published_at: "2026-08-02T00:00:00.000Z",
    updated_at: seeded,
  },
  {
    id: "fallback-post-3",
    slug: "the-whimsical-magic-of-quiet-teatime",
    title: "The Whimsical Magic of Quiet Hours & Studio Ghibli Peace",
    category: "Quiet Hours",
    excerpt:
      "Finding spiritual beauty in quiet tea moments, warm rainfall, and appreciating God's gentle creation through an artistic lens...",
    scripture: "The Lord is my shepherd, I lack nothing. — Psalm 23:1 NIV",
    content:
      "Finding spiritual beauty in quiet tea moments, warm rainfall, and appreciating God's gentle creation through an artistic lens...",
    cover_image: null,
    published: true,
    published_at: "2026-07-20T00:00:00.000Z",
    updated_at: seeded,
  },
];

export const fallbackEvents: SiteEvent[] = [
  {
    id: "fallback-event-1",
    title: "Encouraging Poetics Sanctuary Launch",
    category: "Book Signing",
    location: "Dallas, Texas • Grace Community Center",
    date_label: "Autumn 2026",
    time_label: "6:30 PM - 8:30 PM CST",
    event_date: null,
    description:
      "Join Kalandice for an intimate evening of poetry readings, prayer fellowship, and autographed copies.",
    link_url: null,
    image_url: null,
    sort_order: 1,
    published: true,
  },
  {
    id: "fallback-event-2",
    title: "Finding Hope Through Poetics",
    category: "Open Mic",
    location: "Texas Woman's University Alumni Hall",
    date_label: "Spring 2027",
    time_label: "5:00 PM - 7:00 PM CST",
    event_date: null,
    description:
      "An open sanctuary night discussing mental health, faith, and poetry in seasons of waiting.",
    link_url: null,
    image_url: null,
    sort_order: 2,
    published: true,
  },
  {
    id: "fallback-event-3",
    title: "Trusting God in Seasons of Uncertainty",
    category: "Virtual Fellowship",
    location: "Online Zoom Sanctuary Fellowship",
    date_label: "Monthly Sanctuary Session",
    time_label: "7:00 PM - 8:15 PM CST",
    event_date: null,
    description:
      "Interactive virtual gathering focused on scripture affirmations and emotional encouragement.",
    link_url: null,
    image_url: null,
    sort_order: 3,
    published: true,
  },
];

export const fallbackBooks: Book[] = [
  {
    id: "fallback-book-1",
    title: "Encouraging Poetics",
    subtitle: "By Kalandice Thomas",
    description:
      "Living in this world can be precarious. Encouraging Poetics is a published collection of heartfelt poetry written to walk with you through seasons of anxiety, fear, worry, stress, depression, waiting, and navigating love. Each poem opens your heart and eyes to the unending, unwavering love Jesus has for you.",
    scripture: "The Lord is my shepherd, I lack nothing — Psalms 23:1 NIV",
    cover_image: "/images/book-cover.webp",
    buy_url: "https://a.co/d/07wOG0Ln",
    buy_label: "Buy Paperback on Amazon",
    themes: [
      "Inspirational",
      "Overcoming Anxiety",
      "Finding Hope in Loss",
      "Trusting in Seasons of Waiting",
      "Faith & Unwavering Grace",
      "Emotional Comfort",
    ],
    status: "available",
    featured: true,
    sort_order: 1,
    published: true,
  },
];

export const fallbackResources: Resource[] = [
  {
    id: "fallback-res-1",
    kind: "playlist",
    title: "Encouraging Poetics Vol. 1",
    description: "Worship music to help you get up and go, feeling refreshed and ready to take on the day.",
    url: "https://open.spotify.com/playlist/5NhC7PPBPa2SRXaVq8O6FP?si=GBr_WJ5RSz-jSs43lH1ABA&utm_source=copy-link&pi=wUxUdER7QV2u6",
    tag: "",
    sort_order: 1,
    published: true,
  },
  {
    id: "fallback-res-2",
    kind: "playlist",
    title: "Gentle Hope & Healing",
    description: "Instrumental sanctuary sounds to soothe anxiety and encourage quiet prayer.",
    url: "https://open.spotify.com/playlist/71vRw39TkJi3tgLHaZ3zon?si=31QSCwxkRQ-YqbTjASzIXQ&utm_source=copy-link&pi=9kwdiGVsR2q4N",
    tag: "",
    sort_order: 2,
    published: true,
  },
  {
    id: "fallback-res-3",
    kind: "playlist",
    title: "Faithful Seasons",
    description: "Uplifting spiritual songs for times of transition, waiting, and renewal.",
    url: "https://open.spotify.com/playlist/3Vl5vMo6qu737t00v30KSM?si=YRf1R412QjCVo030-DC-xA",
    tag: "",
    sort_order: 3,
    published: true,
  },
  {
    id: "fallback-res-4",
    kind: "mental_health",
    title: "BetterHelp Professional Therapy",
    description: "Professional online therapy for anxiety, stress, depression, and mental well-being.",
    url: "https://www.betterhelp.com/",
    tag: "Online Therapy",
    sort_order: 1,
    published: true,
  },
  {
    id: "fallback-res-5",
    kind: "mental_health",
    title: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential 24/7 support for anyone experiencing mental health distress or crisis.",
    url: "https://988lifeline.org/",
    tag: "24/7 Crisis Support",
    sort_order: 2,
    published: true,
  },
  {
    id: "fallback-res-6",
    kind: "mental_health",
    title: "NIMH Caring for Mental Health",
    description: "National Institute of Mental Health evidence-based guides for emotional wellness and self-care.",
    url: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
    tag: "Clinical Self-Care",
    sort_order: 3,
    published: true,
  },
  {
    id: "fallback-res-7",
    kind: "faith",
    title: "Help Me Find A Church",
    description:
      "Connect with a local faith community in your area to walk alongside you in fellowship, prayer, and spiritual growth.",
    url: "https://www.churchfinder.com/",
    tag: "Church Finder",
    sort_order: 1,
    published: true,
  },
];

// Deliberately empty: the Reader Reflections section stays hidden until Kalandice
// adds real, permission-given reader quotes in the dashboard.
export const fallbackTestimonials: Testimonial[] = [];
