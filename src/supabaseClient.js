import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knwlnneikeivymwueyzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud2xubmVpa2Vpdnltd3VleXp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzk0OTk5NywiZXhwIjoyMDMzNTI1OTk3fQ.kkxTlS6aQaBrgyO3D7A378BIouxItXwwJz0TZMH1WYM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
