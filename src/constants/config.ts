// Supabase configuration for the mobile app
// Shares the same Supabase project as aethon-web

export const SUPABASE_URL = 'https://hwobooypxlotczxoqpyx.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3b2Jvb3lweGxvdGN6eG9xcHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxOTc5NTgsImV4cCI6MjEwNDc3Mzk1OH0.DDxQErJ-1ndQgzr63hVG-mhoHLt0Qzkr1mg-84w4Sww';

// API base URL for Next.js API routes (if needed for server-side operations)
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://aethon-amber.vercel.app';
