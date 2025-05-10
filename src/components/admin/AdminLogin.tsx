
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// This is just for demo purposes - in a real app, this should be handled securely on a backend
const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'refurbishadmin'
};

const loginFormSchema = z.object({
  username: z.string().min(1, 'Gebruikersnaam is verplicht'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (data.username === DEMO_CREDENTIALS.username && 
          data.password === DEMO_CREDENTIALS.password) {
        // Store auth token
        localStorage.setItem('adminToken', Date.now().toString());
        
        // Call the onLogin callback
        onLogin(true);
        
        // Show success message
        toast.success('Succesvol ingelogd');
        
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        toast.error('Ongeldige gebruikersnaam of wachtwoord');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-brand-darkGreen">
            Refurbish Admin Dashboard
          </CardTitle>
          <CardDescription className="text-center">
            Log in om het admin dashboard te gebruiken
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gebruikersnaam</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Voer uw gebruikersnaam in"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wachtwoord</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Voer uw wachtwoord in"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Bezig met inloggen..." : "Inloggen"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-xs text-center text-gray-500">
            <p>Demo login: username: admin | password: refurbishadmin</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
