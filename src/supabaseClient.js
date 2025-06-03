import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nsuiqxqbhilropahsqjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zdWlxeHFiaGlscm9wYWhzcWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDQ1NzgsImV4cCI6MjA2MzAyMDU3OH0.-hSR4QGOppY7PsS-Gn0gg48XGftYveuGJ2vFzJ69PO8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
