import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Package, ItineraryDay } from '@/types/database';

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async (): Promise<Package[]> => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(pkg => ({
        ...pkg,
        images: (pkg.images as unknown as string[]) || [],
        itinerary: (pkg.itinerary as unknown as ItineraryDay[]) || [],
        included: (pkg.included as unknown as string[]) || [],
        excluded: (pkg.excluded as unknown as string[]) || [],
      }));
    },
  });
};

export const usePackage = (slug: string) => {
  return useQuery({
    queryKey: ['package', slug],
    queryFn: async (): Promise<Package | null> => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        images: (data.images as unknown as string[]) || [],
        itinerary: (data.itinerary as unknown as ItineraryDay[]) || [],
        included: (data.included as unknown as string[]) || [],
        excluded: (data.excluded as unknown as string[]) || [],
      };
    },
    enabled: !!slug,
  });
};
