-- ============================================================================
-- Encouraging Poetics — starter content
--
-- Run AFTER schema.sql. Loads the content currently on the website so nothing
-- disappears when the CMS is switched on. Each block only runs if its table is
-- empty, so re-running never duplicates rows.
-- ============================================================================

-- Blog posts ----------------------------------------------------------------
insert into public.posts (slug, title, category, excerpt, scripture, content, published, published_at)
select * from (values
  (
    'finding-peace-in-anxious-mornings',
    $t$Finding Peace in Anxious Mornings: Unclasping Control$t$,
    'Overcoming Anxiety',
    $t$When anxiety greets you before the alarm sounds, how do we return to God's quiet pastures? Reflections on surrendering control at dawn...$t$,
    $t$Cast all your anxiety on Him because He cares for you. — 1 Peter 5:7$t$,
    $t$When we wake up to the quiet early light of morning, our hearts are often presented with a choice: will we carry yesterday's heavy anxieties, or will we step softly into the Shepherd's quiet pastures?

Living in a fast-moving world can be precarious. Worry tells us to grip tighter, to scramble for answers, and to control outcomes. But Jesus invites us into a radically different posture—unclasping our hands and casting all our anxiety onto Him, because He cares for us with an unending, unwavering love.

> The Lord is my shepherd; I lack nothing. He makes me lie down in green pastures, He leads me beside quiet waters, He refreshes my soul.

Whatever waiting season or anxiety you are facing today, remember that your roots are growing deep in God's grace. Take a slow breath, rest your spirit in His promises, and trust that He is preparing something beautiful in His perfect timing.$t$,
    true,
    timestamptz '2026-08-15'
  ),
  (
    'when-god-asks-you-to-wait',
    $t$When God Asks You to Wait: The Underground Work of Faith$t$,
    'Faith in Waiting',
    $t$Roots grow deepest in the dark, silent earth before the green shoot ever breaks through the surface. Understanding the sacred gift of waiting...$t$,
    $t$They that wait upon the Lord shall renew their strength. — Isaiah 40:31$t$,
    $t$Roots grow deepest in the dark, silent earth before the green shoot ever breaks through the surface. Understanding the sacred gift of waiting...$t$,
    true,
    timestamptz '2026-08-02'
  ),
  (
    'the-whimsical-magic-of-quiet-teatime',
    $t$The Whimsical Magic of Quiet Hours & Studio Ghibli Peace$t$,
    'Quiet Hours',
    $t$Finding spiritual beauty in quiet tea moments, warm rainfall, and appreciating God's gentle creation through an artistic lens...$t$,
    $t$The Lord is my shepherd, I lack nothing. — Psalm 23:1 NIV$t$,
    $t$Finding spiritual beauty in quiet tea moments, warm rainfall, and appreciating God's gentle creation through an artistic lens...$t$,
    true,
    timestamptz '2026-07-20'
  )
) as v
where not exists (select 1 from public.posts);

-- Events --------------------------------------------------------------------
insert into public.events (title, category, location, date_label, time_label, description, sort_order, published)
select * from (values
  ($t$Encouraging Poetics Sanctuary Launch$t$, 'Book Signing', $t$Dallas, Texas • Grace Community Center$t$, 'Autumn 2026', '6:30 PM - 8:30 PM CST',
   $t$Join Kalandice for an intimate evening of poetry readings, prayer fellowship, and autographed copies.$t$, 1, true),
  ($t$Finding Hope Through Poetics$t$, 'Open Mic', $t$Texas Woman's University Alumni Hall$t$, 'Spring 2027', '5:00 PM - 7:00 PM CST',
   $t$An open sanctuary night discussing mental health, faith, and poetry in seasons of waiting.$t$, 2, true),
  ($t$Trusting God in Seasons of Uncertainty$t$, 'Virtual Fellowship', 'Online Zoom Sanctuary Fellowship', 'Monthly Sanctuary Session', '7:00 PM - 8:15 PM CST',
   $t$Interactive virtual gathering focused on scripture affirmations and emotional encouragement.$t$, 3, true)
) as v
where not exists (select 1 from public.events);

-- Books ---------------------------------------------------------------------
insert into public.books (title, subtitle, description, scripture, cover_image, buy_url, buy_label, themes, status, featured, sort_order, published)
select * from (values
  (
    'Encouraging Poetics',
    'By Kalandice Thomas',
    $t$Living in this world can be precarious. Encouraging Poetics is a published collection of heartfelt poetry written to walk with you through seasons of anxiety, fear, worry, stress, depression, waiting, and navigating love. Each poem opens your heart and eyes to the unending, unwavering love Jesus has for you.$t$,
    $t$The Lord is my shepherd, I lack nothing — Psalm 23:1 NIV$t$,
    '/images/book-cover.webp',
    'https://a.co/d/07wOG0Ln',
    'Buy Paperback on Amazon',
    array['Inspirational', 'Overcoming Anxiety', 'Finding Hope in Loss', 'Trusting in Seasons of Waiting', 'Faith & Unwavering Grace', 'Emotional Comfort'],
    'available',
    true,
    1,
    true
  )
) as v
where not exists (select 1 from public.books);

-- Resources -----------------------------------------------------------------
insert into public.resources (kind, title, description, url, tag, sort_order, published)
select * from (values
  ('playlist', 'Encouraging Poetics Vol. 1', $t$Worship music to help you get up and go, feeling refreshed and ready to take on the day.$t$,
   'https://open.spotify.com/playlist/5NhC7PPBPa2SRXaVq8O6FP?si=GBr_WJ5RSz-jSs43lH1ABA&utm_source=copy-link&pi=wUxUdER7QV2u6', '', 1, true),
  ('playlist', $t$Gentle Hope & Healing$t$, $t$Instrumental sanctuary sounds to soothe anxiety and encourage quiet prayer.$t$,
   'https://open.spotify.com/playlist/71vRw39TkJi3tgLHaZ3zon?si=31QSCwxkRQ-YqbTjASzIXQ&utm_source=copy-link&pi=9kwdiGVsR2q4N', '', 2, true),
  ('playlist', 'Faithful Seasons', $t$Uplifting spiritual songs for times of transition, waiting, and renewal.$t$,
   'https://open.spotify.com/playlist/3Vl5vMo6qu737t00v30KSM?si=YRf1R412QjCVo030-DC-xA', '', 3, true),
  ('mental_health', 'BetterHelp Professional Therapy', $t$Professional online therapy for anxiety, stress, depression, and mental well-being.$t$,
   'https://www.betterhelp.com/', 'Online Therapy', 1, true),
  ('mental_health', $t$988 Suicide & Crisis Lifeline$t$, $t$Free, confidential 24/7 support for anyone experiencing mental health distress or crisis.$t$,
   'https://988lifeline.org/', '24/7 Crisis Support', 2, true),
  ('mental_health', 'NIMH Caring for Mental Health', $t$National Institute of Mental Health evidence-based guides for emotional wellness and self-care.$t$,
   'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health', 'Clinical Self-Care', 3, true),
  ('faith', 'Help Me Find A Church', $t$Connect with a local faith community in your area to walk alongside you in fellowship, prayer, and spiritual growth.$t$,
   'https://www.churchfinder.com/', 'Church Finder', 1, true)
) as v
where not exists (select 1 from public.resources);
