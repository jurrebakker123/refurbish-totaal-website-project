
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@refurbishtotaalnederland.nl');
  const [password, setPassword] = useState('RefurbishAdmin2024!');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fixed admin credentials
  const ADMIN_EMAIL = 'admin@refurbishtotaalnederland.nl';
  const ADMIN_PASSWORD = 'RefurbishAdmin2024!';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      // Check if credentials match the fixed admin credentials
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        toast.error("Ongeldige admin credentials");
        setLoading(false);
        return;
      }

      // Try to sign in with Supabase
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      console.log('Sign in attempt result:', { data: signInData, error: signInError });

      if (signInError) {
        console.log('Sign in failed, attempting to create admin account...');
        
        // If user doesn't exist, create it
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          options: {
            emailRedirectTo: undefined // Disable email confirmation
          }
        });

        console.log('Sign up attempt result:', { data: signUpData, error: signUpError });

        if (signUpError) {
          toast.error("Fout bij aanmaken admin account: " + signUpError.message);
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

          console.log('Admin user creation result:', { error: adminError });

          if (adminError) {
            console.error('Error adding to admin_users:', adminError);
          }

          // If email confirmation is required, show message
          if (!signUpData.session) {
            toast.error("Email bevestiging vereist. Controleer je email of schakel email verificatie uit in Supabase.");
            setLoading(false);
            return;
          }

          toast.success("Admin account aangemaakt en ingelogd");
          navigate('/admin-dashboard');
          setLoading(false);
          return;
        }
      }

      // Successfully signed in
      if (signInData.user) {
        console.log('Successfully signed in, checking admin status...');
        
        // Check if user is admin
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', signInData.user.id)
          .single();

        console.log('Admin check result:', { adminUser, error: adminError });

        if (adminError || !adminUser) {
          // Add user to admin_users if not already there
          const { error: insertError } = await supabase
            .from('admin_users')
            .insert({
              id: signInData.user.id,
              email: signInData.user.email,
              created_at: new Date().toISOString()
            });

          if (insertError && !insertError.message.includes('duplicate')) {
            console.error('Error adding to admin_users:', insertError);
            await supabase.auth.signOut();
            toast.error("Fout bij admin toegang");
            setLoading(false);
            return;
          }
        }

        toast.success("Succesvol ingelogd als admin");
        navigate('/admin-dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
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
            Gebruik de vaste admin credentials
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
                readOnly
                className="bg-gray-100"
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
              Email: admin@refurbishtotaalnederland.nl<br/>
              Wachtwoord: RefurbishAdmin2024!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
