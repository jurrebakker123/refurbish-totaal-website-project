
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminIsolatiePage = () => {
  const navigate = useNavigate();
  const [configuraties] = useState([]); // Placeholder voor isolatie data

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />
      
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
            <h1 className="text-2xl font-bold text-gray-900">🏠 Isolatie Dashboard</h1>
            <p className="text-gray-600">Beheer isolatie projecten en selecties</p>
          </div>
        </div>

        <DashboardStats configuraties={configuraties} />
        
        <div className="grid gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Isolatie Selecties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Hier komen de isolatie specifieke tabellen en functionaliteit...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminIsolatiePage;
