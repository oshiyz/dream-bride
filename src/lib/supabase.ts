import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Dress = {
  id: number;
  name: string;
  description: string;
  category: string;
  price_per_day: number;
  images: string[];
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
}; 