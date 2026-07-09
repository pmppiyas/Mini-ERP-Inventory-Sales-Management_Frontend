import { z } from 'zod';

export const addProductSchema = z.object({
  name: z
    .string({ error: 'Product name is required' })
    .trim()
    .min(2, { message: 'Product name must be at least 2 characters' }),

  sku: z
    .string({ error: 'SKU is required' })
    .trim()
    .min(3, { message: 'SKU must be at least 3 characters' }),

  category: z
    .string({ error: 'Category is required' })
    .min(1, { message: 'Please select a category' }),

  purchasePrice: z
    .number({ error: 'Purchase price is required' })
    .min(0, { message: 'Purchase price cannot be negative' }),

  sellingPrice: z
    .number({ error: 'Selling price is required' })
    .min(0, { message: 'Selling price cannot be negative' }),

  stockQuantity: z
    .number({ error: 'Stock quantity is required' })
    .int({ message: 'Stock quantity must be an integer' })
    .min(0, { message: 'Stock quantity cannot be negative' }),

  image: z
    .instanceof(File)
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      { message: 'Only JPG, PNG and WEBP images are allowed' }
    )
    .optional(),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;
