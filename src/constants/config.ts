// Supabase configuration for the mobile app
// Shares the same Supabase project as aethon-web

export const SUPABASE_URL = 'https://zybhgwnwtrizsmeppfxo.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_PQex3ajVaowjNPXdK-fa6w_dtdC6qRM';

// API base URL for Next.js API routes (if needed for server-side operations)
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://aethon-amber.vercel.app';
