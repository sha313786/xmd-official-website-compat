import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL=https://lkkzikoiwybptorwdpox.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxra3ppa29pd3licHRvcndkcG94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzYxNjMwNSwiZXhwIjoyMDk5MTkyMzA1fQ.wCOQ-JgT-Vsodc6AJi9T0fKySQiE59Rrxt9DILgHx6U
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);