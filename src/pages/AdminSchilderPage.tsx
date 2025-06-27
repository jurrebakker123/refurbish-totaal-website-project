
import React from 'react';
import SchilderDashboard from '@/components/admin/SchilderDashboard';
import { Helmet } from 'react-helmet';

const AdminSchilderPage = () => {
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
