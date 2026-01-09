import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePackages = () => {
  return useQuery({
    queryKey: ['admin-packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (packageData: {
      name: string;
      slug: string;
      location: string;
      duration: string;
      description: string;
      short_description?: string;
      price_resident: number;
      price_non_resident: number;
      category?: string;
      difficulty?: string;
      group_size?: string;
      best_time?: string;
      is_active?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('packages')
        .insert(packageData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('packages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};
