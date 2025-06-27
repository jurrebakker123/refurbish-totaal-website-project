
import React from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import StukadoorDashboard from '@/components/admin/StukadoorDashboard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';

const AdminStukadoorPage = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Stucwerk Dashboard - Admin | Refurbish Totaal Nederland</title>
      </Helmet>
      <StukadoorDashboard />
    </div>
  );
};

export default AdminStukadoorPage;
