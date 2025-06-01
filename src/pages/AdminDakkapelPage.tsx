
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminDakkapelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar Selectie
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🏠 Dakkapel Dashboard</h1>
            <p className="text-gray-600">Beheer dakkapel configuraties en aanvragen</p>
          </div>
        </div>

        <DashboardStats />
        
        <div className="grid gap-6 mt-6">
          <ConfiguratorRequestsTable />
          <ProcessedRequestsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDakkapelPage;
