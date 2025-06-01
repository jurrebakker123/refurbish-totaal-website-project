
import React from 'react';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import DashboardSelector from '@/components/admin/DashboardSelector';

const AdminDashboardPage = () => {
  return (
    <ProtectedAdminRoute>
      <DashboardSelector />
    </ProtectedAdminRoute>
  );
};

export default AdminDashboardPage;
