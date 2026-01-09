import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BookingData {
  packageId: string | null;
  packageName: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  guests: number;
  isResident: boolean;
  message?: string;
  totalPrice?: number;
}

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (data: BookingData) => {
      const { error } = await supabase
        .from('bookings')
        .insert({
          package_id: data.packageId,
          package_name: data.packageName,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          travel_date: data.travelDate,
          guests: data.guests,
          is_resident: data.isResident,
          message: data.message || null,
          total_price: data.totalPrice || null,
          status: 'pending',
        });

      if (error) throw error;
      return { success: true };
    },
  });
};
