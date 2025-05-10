
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { useSidebar } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { collapsed } = useSidebar();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      // Redirect to login page if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
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
