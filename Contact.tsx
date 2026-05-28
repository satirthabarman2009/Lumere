import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main' | 'drinks' | 'desserts' | 'special';
  image_url: string;
  rating: number;
  is_popular: boolean;
  is_available: boolean;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  category: 'food' | 'interior' | 'customers' | 'ambience' | 'chef' | 'signature';
  image_url: string;
  description: string;
  display_order: number;
  created_at: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  is_featured: boolean;
  created_at: string;
};

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
};
