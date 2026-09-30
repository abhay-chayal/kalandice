-- ============================================================================
-- Give a user access to the /admin dashboard.
--
-- 1. Invite the person first: Supabase → Authentication → Users → Invite user.
-- 2. Replace the email below and run this in the SQL Editor.
--
-- Run it once for Kalandice, and once for each developer who needs access.
-- To remove someone later:
--   delete from public.admin_users
--   where user_id = (select id from auth.users where email = 'someone@example.com');
-- ============================================================================

insert into public.admin_users (user_id)
select id from auth.users where email = lower('REPLACE_WITH_EMAIL@example.com')
on conflict (user_id) do nothing;

-- Check who has access:
select u.email, a.created_at
from public.admin_users a
join auth.users u on u.id = a.user_id;
