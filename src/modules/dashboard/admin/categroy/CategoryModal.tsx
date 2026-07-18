import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type {
  ICategory,
  ICategoryPayload,
} from '@/interfaces/category.interface';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/redux/features/category/category.api';
import { Loader2, Pencil, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'CREATE' | 'UPDATE';
  category?: ICategory | null;
  categories?: ICategory[] | null;
}

const CategoryModal = ({
  open,
  onClose,
  mode,
  category,
  categories,
}: CategoryModalProps) => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (mode === 'UPDATE' && category) {
      setName(category.name);
      setParentId(category.parentId ?? '');
    } else {
      setName('');
      setParentId('');
    }
  }, [mode, category, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };

    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, isLoading, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const flattenCategories = (
    cats: ICategory[],
    level = 0,
    excludeId?: string
  ): (ICategory & { level: number })[] =>
    cats.flatMap((cat) =>
      cat._id === excludeId
        ? []
        : [
            { ...cat, level },
            ...flattenCategories(cat.children ?? [], level + 1, excludeId),
          ]
    );

  const parentOptions = flattenCategories(categories ?? [], 0, category?._id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'CREATE') {
        await createCategory({
          name: name.trim(),
          ...(parentId ? { parentId } : {}),
          categoryId: '',
        }).unwrap();

        toast.success('Category created successfully!');
      } else {
        const payload: ICategoryPayload = {
          categoryId: category!._id,
          MODE: 'EDIT',
          name: name.trim(),
        };

        if (parentId !== (category?.parentId ?? '')) {
          payload.parentId = parentId;
        }

        await updateCategory(payload).unwrap();

        toast.success('Category updated successfully!');
      }

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        mode === 'CREATE'
          ? 'Failed to create category.'
          : 'Failed to update category.'
      );
    }
  };
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.currentTarget === e.target && !isLoading) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card shadow-xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              {mode === 'CREATE' ? (
                <Plus className="h-4 w-4 text-primary" />
              ) : (
                <Pencil className="h-4 w-4 text-primary" />
              )}
            </div>
            <h2 className="text-sm font-semibold text-foreground">
              {mode === 'CREATE' ? 'Add Category' : 'Edit Category'}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Category Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Electronics"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {/* Parent */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Parent Category{' '}
              <span className="text-muted-foreground">(optional)</span>
            </label>
            <Select
              value={parentId || 'none'}
              onValueChange={(value) =>
                setParentId(value === 'none' ? '' : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="No parent" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No parent (Top Level)</SelectItem>

                {parentOptions.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {'— '.repeat(cat.level)}
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {mode === 'CREATE' ? 'Creating...' : 'Saving...'}
                </>
              ) : mode === 'CREATE' ? (
                'Add Category'
              ) : (
                'Save Changes'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
