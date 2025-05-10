
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import AdminLogin from '@/components/admin/AdminLogin';
import { useSidebar } from '@/components/ui/sidebar';

const AdminDashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { collapsed } = useSidebar();
  
  useEffect(() => {
    // Check if user is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
    if (success) {
      localStorage.setItem('adminToken', Date.now().toString());
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Admin Dashboard | Refurbish Dakkapel</title>
      </Helmet>
      
      <AdminHeader onLogout={handleLogout} />
      
      <div className="flex flex-1 w-full">
        <AdminSidebar />
        
        <main className={`flex-1 p-6 transition-all ${collapsed ? 'ml-14' : 'ml-60'}`}>
          <AdminPriceEditor />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
