/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Mail, Lock, User, Chrome } from 'lucide-react';
import { useNavigate, Link } from '@tanstack/react-router';
import { signupSchema, type SignupFormData } from '../schemas/authSchemas';
import { useAuthApi } from '../api/authApi';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthApi();

  // Initialize form with React Hook Form and Zod validation
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // Handle signup form submission
  const handleSignupSubmit = async (data: SignupFormData) => {
    try {
      signupForm.clearErrors();

      await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success('Account created successfully!');
      navigate({ to: '/login' });
    } catch (error: any) {
      console.error('Registration error:', error);
      signupForm.setError('root', {
        message:
          error.response?.data?.message ||
          'Registration failed. Please try again.',
      });
      // Other errors are handled by useAxios interceptor (toast notifications)
    }
  };

  // const handleGoogleRegister = () => {
  //   // Mock Google register - replace with real Google OAuth when integrating backend
  //   const mockGoogleUser = {
  //     id: 'google_' + Date.now(),
  //     name: 'Google User',
  //     email: 'user@gmail.com',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
  //   };
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-elegant hover-glow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join ChatApp</CardTitle>
          <CardDescription>
            Create your account to start chatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => {}} variant="outline" className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              or
            </span>
          </div>

          {/* Signup Form */}
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
              className="space-y-4"
            >
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Enter your username"
                          className="pl-10"
                          autoComplete="off"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Enter your email"
                          className="pl-10"
                          autoComplete="off"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display form-level errors */}
              {signupForm.formState.errors.root && (
                <div className="text-sm text-destructive text-center">
                  {signupForm.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-75"
                disabled={signupForm.formState.isSubmitting}
              >
                {signupForm.formState.isSubmitting
                  ? 'Creating Account...'
                  : 'Create Account'}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
