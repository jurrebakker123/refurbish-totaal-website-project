
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Vacature {
  id: string;
  title: string;
  location: string;
  type: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  icon_name: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const useVacatures = () => {
  const [vacatures, setVacatures] = useState<Vacature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVacatures = async () => {
      try {
        const { data, error } = await supabase
          .from('vacatures')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (error) throw error;
        setVacatures(data || []);
      } catch (error) {
        console.error('Error loading vacatures:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVacatures();
  }, []);

  return { vacatures, loading };
};
