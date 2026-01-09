// Custom types for database tables until auto-generated types are available

export interface Package {
  id: string;
  slug: string;
  name: string;
  location: string;
  duration: string;
  description: string;
  short_description: string | null;
  price_resident: number;
  price_non_resident: number;
  rating: number | null;
  reviews_count: number | null;
  best_time: string | null;
  difficulty: string | null;
  group_size: string | null;
  category: string | null;
  images: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  meals?: string[];
  accommodation?: string;
}

export interface Booking {
  id: string;
  package_id: string | null;
  package_name: string;
  full_name: string;
  email: string;
  phone: string;
  travel_date: string;
  guests: number;
  is_resident: boolean;
  message: string | null;
  status: string;
  total_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  package_id: string;
  customer_name: string;
  customer_location: string | null;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
