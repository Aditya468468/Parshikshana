import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Building2, Users, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import heroImage from '@/assets/hero-internship.jpg';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.enum(['student', 'college_admin', 'company'], {
    required_error: 'Please select a role',
  }),
});

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

const roleOptions = [
  { value: 'student', label: 'Student', icon: GraduationCap, description: 'Find and apply for internships' },
  { value: 'college_admin', label: 'College Admin', icon: Users, description: 'Manage students and companies' },
  { value: 'company', label: 'Company', icon: Building2, description: 'Post internships and hire students' },
];

export default function AuthPage() {
  const { user, loading, demoLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      role: undefined,
    },
  });

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const onSignIn = async (data: SignInForm) => {
    setIsSubmitting(true);
    const { error, role } = await demoLogin(data.email, data.password);
    setIsSubmitting(false);
    
    if (!error && role) {
      // Redirect based on role
      if (role === 'student') {
        navigate('/student-dashboard');
      } else if (role === 'college_admin') {
        navigate('/faculty-dashboard');
      } else if (role === 'company') {
        navigate('/industry-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Students and professionals connecting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Prashiskshan</h1>
            <p className="text-xl opacity-90">Connecting Students, Colleges, and Industry</p>
          </div>
        </div>
      </div>

      {/* Auth Forms */}
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                    
                    <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
                      <p className="text-sm font-medium text-foreground mb-2">Demo Login – Use Sample Accounts:</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>• Student: student@demo.com / student123</p>
                        <p>• Faculty: faculty@demo.com / faculty123</p>
                        <p>• Industry: industry@demo.com / industry123</p>
                      </div>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Sign up is disabled in demo mode. Please use one of the demo accounts to explore the platform.
                  </p>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-md text-left">
                    <p className="text-sm font-medium text-foreground mb-2">Available Demo Accounts:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• Student: student@demo.com / student123</p>
                      <p>• Faculty: faculty@demo.com / faculty123</p>
                      <p>• Industry: industry@demo.com / industry123</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}