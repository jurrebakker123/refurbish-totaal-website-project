
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MarketplaceAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [userType, setUserType] = useState('klant');
  const [voornaam, setVoornaam] = useState('');
  const [achternaam, setAchternaam] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirect based on user type
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.user_type === 'vakman') {
          navigate('/marketplace/vakman-dashboard');
        } else {
          navigate('/marketplace/klant-dashboard');
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile to determine redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.user.id)
          .single();

        toast.success('Succesvol ingelogd!');
        
        if (profile?.user_type === 'vakman') {
          navigate('/marketplace/vakman-dashboard');
        } else {
          navigate('/marketplace/klant-dashboard');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Er ging iets mis bij het inloggen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/marketplace/login`,
          data: {
            user_type: userType,
            voornaam: voornaam,
            achternaam: achternaam,
          }
        }
      });

      if (error) throw error;

      toast.success('Account aangemaakt! Check je email voor bevestiging.');
      setActiveTab('login');
    } catch (error: any) {
      toast.error(error.message || 'Er ging iets mis bij het aanmelden');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Inloggen - Marketplace</title>
        <meta name="description" content="Log in of maak een account aan voor het Refurbish Marketplace platform" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/marketplace" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Totaal Nederland</span>
                <span className="text-sm text-gray-500">Marketplace</span>
              </Link>
              <Link to="/marketplace" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar marketplace
              </Link>
            </div>
          </div>
        </section>

        {/* Auth Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-md">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Marketplace Account</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Inloggen</TabsTrigger>
                    <TabsTrigger value="signup">Aanmelden</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="loginEmail">E-mailadres</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="loginPassword">Wachtwoord</Label>
                        <div className="relative">
                          <Input
                            id="loginPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label>Ik ben een:</Label>
                        <RadioGroup 
                          value={userType} 
                          onValueChange={setUserType}
                          className="flex flex-row space-x-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="klant" id="klant" />
                            <Label htmlFor="klant">Klant (ik zoek een vakman)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vakman" id="vakman" />
                            <Label htmlFor="vakman">Vakman (ik zoek klussen)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="voornaam">Voornaam</Label>
                          <Input
                            id="voornaam"
                            value={voornaam}
                            onChange={(e) => setVoornaam(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="achternaam">Achternaam</Label>
                          <Input
                            id="achternaam"
                            value={achternaam}
                            onChange={(e) => setAchternaam(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signupEmail">E-mailadres</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="signupPassword">Wachtwoord</Label>
                        <div className="relative">
                          <Input
                            id="signupPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Minimaal 6 karakters</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Bezig met aanmelden...' : 'Account Aanmaken'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default MarketplaceAuthPage;
