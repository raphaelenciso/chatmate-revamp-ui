/* eslint-disable react-hooks/exhaustive-deps */
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
import { Mail, Lock, User } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/google-icon';
import { useNavigate, Link } from '@tanstack/react-router';
import { signupSchema, type SignupFormData } from '../schemas/authSchemas';
import { useAuthApi } from '../api/authApi';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { generateAvatarOptions } from '@/utils/avatarUtils';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthApi();
  const [avatarCount, setAvatarCount] = useState(0);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);

  // Generate multiple avatar options for user to choose from
  const avatarOptions = useMemo(() => {
    return generateAvatarOptions(5, 'lorelei', 'svg');
  }, [avatarCount]);

  // Current selected avatar URL
  const selectedAvatarUrl = avatarOptions[selectedAvatarIndex];

  // Initialize form with React Hook Form and Zod validation
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
  });

  // Handle signup form submission
  const handleSignupSubmit = async ({
    username,
    email,
    password,
  }: SignupFormData) => {
    try {
      signupForm.clearErrors();

      await register({
        username,
        email,
        password,
        avatar: selectedAvatarUrl,
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <Card className="w-full max-w-md shadow-elegant hover-glow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-1 mt-2">
            <img src="/chatmate.png" alt="chatmate" className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Join ChatMate</CardTitle>
          <CardDescription>
            Create your account to start chatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar Selection */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Choose your avatar
            </div>
            <div className="flex items-center space-x-2">
              {avatarOptions.map((avatarUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAvatarIndex(index)}
                  className={`p-1 rounded-full transition-all cursor-pointer ${
                    selectedAvatarIndex === index
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'hover:scale-110'
                  }`}
                >
                  <img
                    src={avatarUrl}
                    alt={`Avatar option ${index + 1}`}
                    className="w-12 h-12 rounded-full"
                  />
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAvatarCount((prev) => prev + 1)}
              className="text-xs"
            >
              Generate New Options
            </Button>
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
            <Link to="/login" className="text-sm text-primary hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
