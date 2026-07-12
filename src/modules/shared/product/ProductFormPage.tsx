import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  addProductSchema,
  type AddProductFormValues,
} from '@/validation/addProduct.schema';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '@/redux/features/product/product.api';
import { useGetCategoriesQuery } from '@/redux/features/category/category.api';
import type { IProduct } from '@/interfaces/product.interface';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  ArrowLeft,
  ImagePlus,
  Package,
  Tag,
  Layers,
  TrendingDown,
  TrendingUp,
  X,
  Loader2,
} from 'lucide-react';

interface ProductFormPageProps {
  mode: 'add' | 'edit';
  product?: IProduct;
}

const ProductFormPage = ({ mode, product }: ProductFormPageProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    mode === 'edit' ? (product?.photoUrl ?? null) : null
  );
  const [isNewImage, setIsNewImage] = useState(false);

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const isLoading = isAdding || isUpdating;

  const { data: categories = [] } = useGetCategoriesQuery();

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      category: product?.category?._id ?? '',
      purchasePrice: product?.purchasePrice ?? undefined,
      sellingPrice: product?.sellingPrice ?? undefined,
      stockQuantity: product?.stockQuantity ?? undefined,
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    form.setValue('image', file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
    setIsNewImage(true);
  };

  const clearImage = () => {
    setPreview(mode === 'edit' ? (product?.photoUrl ?? null) : null);
    setIsNewImage(false);
    form.setValue('image', undefined as any, { shouldValidate: false });
    form.clearErrors('image');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (values: AddProductFormValues) => {
    const formData = new FormData();

    formData.append(
      'data',
      JSON.stringify({
        name: values.name,
        sku: values.sku,
        category: values.category,
        purchasePrice: Number(values.purchasePrice),
        sellingPrice: Number(values.sellingPrice),
        stockQuantity: Number(values.stockQuantity),
      })
    );

    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      if (mode === 'add') {
        await addProduct(formData).unwrap();
        toast.success('Product added successfully!');
      } else {
        await updateProduct({ id: product!._id, formData }).unwrap();
        toast.success('Product updated successfully!');
      }
      navigate('/admin/products');
    } catch {
      toast.error(
        mode === 'add'
          ? 'Failed to add product. Please try again.'
          : 'Failed to update product. Please try again.'
      );
    }
  };

  const watchedValues = form.watch();
  const profit =
    (watchedValues.sellingPrice || 0) - (watchedValues.purchasePrice || 0);

  const pageTitle = mode === 'add' ? 'Add Product' : 'Edit Product';
  const pageDesc =
    mode === 'add'
      ? 'Fill in the details to add a new product to inventory'
      : 'Update the product details below';
  const submitLabel = mode === 'add' ? 'Add Product' : 'Save Changes';
  const submittingLabel = mode === 'add' ? 'Adding...' : 'Saving...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
            <p className="text-xs text-muted-foreground">{pageDesc}</p>
          </div>
          {/* Edit mode badge */}
          {mode === 'edit' && (
            <span className="ml-auto text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              Editing: {product?.sku}
            </span>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Image Upload / Preview */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div
              className="relative bg-muted h-72 lg:h-full min-h-72 flex items-center justify-center cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-medium">
                      Click to {isNewImage ? 'change' : 'replace'} image
                    </p>
                  </div>
                  {/* Remove / Reset button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
                    title={isNewImage ? 'Remove new image' : 'Remove image'}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* Badge: shows whether it's the existing or new image */}
                  {mode === 'edit' && (
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                          isNewImage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-black/50 text-white'
                        }`}
                      >
                        {isNewImage ? 'New image' : 'Current image'}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground p-6">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <ImagePlus className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      Click to upload image
                    </p>
                    <p className="text-xs mt-1">JPG, PNG, WEBP — max 5MB</p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Image error */}
            {form.formState.errors.image && (
              <div className="px-4 py-2 bg-destructive/5 border-t border-destructive/20">
                <p className="text-xs text-destructive">
                  {form.formState.errors.image.message}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT — Form Fields */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm">
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Samsung Galaxy S24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SKU + Category */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">SKU</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. SGS24-128"
                        className="font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center text-blue-500 bg-blue-500/10">
                        <TrendingDown className="h-3 w-3" />
                      </div>
                      Purchase Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center text-primary bg-primary/10">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      Selling Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Stock */}
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm">
                    <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                    Stock Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Profit Preview */}
            {watchedValues.purchasePrice || watchedValues.sellingPrice ? (
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  Live Preview
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Profit / unit
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      profit >= 0 ? 'text-emerald-500' : 'text-destructive'
                    }`}
                  >
                    {profit >= 0 ? '+' : ''}৳{profit.toLocaleString()}
                    {watchedValues.sellingPrice
                      ? ` (${((profit / watchedValues.sellingPrice) * 100).toFixed(1)}%)`
                      : ''}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {submittingLabel}
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductFormPage;
