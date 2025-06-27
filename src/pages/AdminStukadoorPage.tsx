
import React from 'react';
import StukadoorDashboard from '@/components/admin/StukadoorDashboard';
import { Helmet } from 'react-helmet';

const AdminStukadoorPage = () => {
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
