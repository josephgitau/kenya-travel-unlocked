import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  package_id: string;
  customer_name: string;
  customer_location: string | null;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string | null;
}

export const usePackageReviews = (packageId: string) => {
  return useQuery({
    queryKey: ['reviews', packageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('package_id', packageId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!packageId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (review: {
      package_id: string;
      customer_name: string;
      customer_location?: string;
      rating: number;
      comment: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          ...review,
          is_approved: false, // Reviews need admin approval
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.package_id] });
    },
  });
};
