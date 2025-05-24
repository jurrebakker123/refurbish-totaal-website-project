
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fixed admin credentials
  const ADMIN_EMAIL = 'admin@refurbishtotaalnederland.nl';
  const ADMIN_PASSWORD = 'RefurbishAdmin2024!';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if credentials match the fixed admin credentials
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        toast.error("Ongeldige admin credentials");
        setLoading(false);
        return;
      }

      // Try to sign in with Supabase (this will create the user if it doesn't exist)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (error) {
        // If user doesn't exist, create it
        if (error.message.includes('Invalid login credentials')) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
          });

          if (signUpError) {
            toast.error("Fout bij aanmaken admin: " + signUpError.message);
            setLoading(false);
            return;
          }

          if (signUpData.user) {
            // Add to admin_users table
            const { error: adminError } = await supabase
              .from('admin_users')
              .insert({
                id: signUpData.user.id,
                email: signUpData.user.email,
                created_at: new Date().toISOString()
              });

            if (adminError) {
              console.error('Error adding to admin_users:', adminError);
            }

            toast.success("Admin account aangemaakt en ingelogd");
            navigate('/admin-dashboard');
            setLoading(false);
            return;
          }
        } else {
          throw error;
        }
      }

      // Check if user is admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (adminError || !adminUser) {
        await supabase.auth.signOut();
        toast.error("U heeft geen admin toegang");
        setLoading(false);
        return;
      }

      toast.success("Succesvol ingelogd als admin");
      navigate('/admin-dashboard');
    } catch (error: any) {
      toast.error("Fout bij inloggen: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Alleen voor geautoriseerde beheerders
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@refurbishtotaalnederland.nl"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Wachtwoord
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Geen toegang? Neem contact op met de systeembeheerder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
