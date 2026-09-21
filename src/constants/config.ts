// Supabase configuration for the mobile app
// Shares the same Supabase project as aethon-web

export const SUPABASE_URL = 'YOUR_SUPABASE_URL';        // Same as NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Same as NEXT_PUBLIC_SUPABASE_ANON_KEY

// API base URL for Next.js API routes (if needed for server-side operations)
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://aethon-amber.vercel.app';
