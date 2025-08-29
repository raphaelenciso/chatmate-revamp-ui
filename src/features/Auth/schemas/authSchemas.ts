import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
  usernameoremail: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Signup form schema
export const signupSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be less than 50 characters'),
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  avatar: z.string().optional(),
});

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
