import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { ICategory } from '@/interfaces/category.interface';
import {
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
} from '@/redux/features/category/category.api';
import { Loader2, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategoryUpdateModalProps {
  open: boolean;
  onClose: () => void;
  category: ICategory | null;
}

const CategoryUpdateModal = ({
  open,
  onClose,
  category,
}: CategoryUpdateModalProps) => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');

  const { data: allCategories = [] } = useGetCategoriesQuery();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setParentId(category.parentId ?? '');
    }
  }, [category]);

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

  if (!open || !category) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory({
        categoryId: category._id,
        name: name.trim(),
        ...(parentId && parentId !== 'none' ? { parentId } : {}),
        MODE: 'EDIT',
      }).unwrap();
      toast.success(`"${name}" updated successfully!`);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error('Failed to update category.');
    }
  };

  const flattenExcluding = (
    cats: ICategory[],
    excludeId: string
  ): ICategory[] =>
    cats.flatMap((c) =>
      c._id === excludeId
        ? []
        : [c, ...flattenExcluding(c.children ?? [], excludeId)]
    );

  const parentOptions = flattenExcluding(allCategories, category._id);

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
              <Pencil className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">
              Edit Category
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
              onValueChange={(v) => setParentId(v === 'none' ? '' : v)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="No parent (top level)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No parent (top level)</SelectItem>
                {parentOptions.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
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
                  Saving...
                </>
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

export default CategoryUpdateModal;
