
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from './AdminLogin';
import { Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Check if user is admin
        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error || !adminUser) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
        } else if (event === 'SIGNED_IN' && session?.user) {
          // Check admin status
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setIsAuthenticated(!!adminUser);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Authenticatie controleren...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
