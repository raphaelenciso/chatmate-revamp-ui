/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
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
import { Mail, Lock } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/google-icon';
import { useNavigate, Link } from '@tanstack/react-router';
import { loginSchema, type LoginFormData } from '../schemas/authSchemas';
import { useAuthApi } from '../api/authApi';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthApi();
  const setUser = useAuthStore((state) => state.setUser);

  // Initialize form with React Hook Form and Zod validation
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameoremail: '',
      password: '',
    },
  });

  // Handle login form submission
  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      loginForm.clearErrors();

      const response = await login({
        usernameoremail: data.usernameoremail,
        password: data.password,
      });

      const { id, username, email, avatar, role, accessToken, refreshToken } =
        response.data;

      // Create user object for auth store
      const authUser = {
        id,
        username,
        email,
        avatar,
        role,
        accessToken,
        refreshToken,
      };
      setUser(authUser);

      toast.success('Login successful!');
      navigate({ to: '/chat' });
    } catch (error: any) {
      console.error('Login error:', error);
      loginForm.setError('root', {
        message:
          error.response?.data?.message ||
          'Registration failed. Please try again.',
      });
    }
  };

  // const handleGoogleLogin = () => {
  //   // Mock Google login - replace with real Google OAuth when integrating backend
  //   const mockGoogleUser = {
  //     id: 'google_' + Date.now(),
  //     name: 'Google User',
  //     email: 'user@gmail.com',
  //     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
  //   };
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <Card className="w-full max-w-md shadow-elegant hover-glow">
        <CardHeader className="text-center gap-0">
          <div className="flex justify-center mb-1 mt-2">
            <img src="/chatmate.png" alt="chatmate" className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to continue your conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Login Form */}
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="usernameoremail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Enter your username or email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                        <PasswordInput
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
              {loginForm.formState.errors.root && (
                <div className="text-sm text-destructive text-center">
                  {loginForm.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-75"
                disabled={loginForm.formState.isSubmitting}
              >
                {loginForm.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              or
            </span>
          </div>

          <Button onClick={() => {}} variant="outline" className="w-full">
            <GoogleIcon size={16} className="mr-2" />
            Continue with Google
          </Button>

          <div className="text-center">
            <Link
              to="/register"
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
