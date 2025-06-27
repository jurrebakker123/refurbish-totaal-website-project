
import React from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import SchilderDashboard from '@/components/admin/SchilderDashboard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';

const AdminSchilderPage = () => {
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
        <title>Schilderwerk Dashboard - Admin | Refurbish Totaal Nederland</title>
      </Helmet>
      <SchilderDashboard />
    </div>
  );
};

export default AdminSchilderPage;
