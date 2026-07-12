import { z } from 'zod';

const userBaseSchema = {
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' }),

  phone: z
    .string({ error: 'Phone number is required' })
    .trim()
    .min(11, { message: 'Phone number must be at least 11 digits' })
    .max(15, { message: 'Phone number is too long' }),

  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' }),

  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).default('EMPLOYEE'),

  permissions: z.array(z.string()).default([]),

  photoUrl: z.string().optional(),
};

export const addUserSchema = z
  .object({
    ...userBaseSchema,

    password: z
      .string({ error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' }),

    repeatPassword: z.string({
      error: 'Repeat password is required',
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Passwords do not match',
  });

export type AddUserFormValues = z.infer<typeof addUserSchema>;

export const updateUserSchema = z
  .object({
    ...userBaseSchema,

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .optional()
      .or(z.literal('')),

    repeatPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (!data.password && !data.repeatPassword) return true;

      return data.password === data.repeatPassword;
    },
    {
      path: ['repeatPassword'],
      message: 'Passwords do not match',
    }
  );

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
