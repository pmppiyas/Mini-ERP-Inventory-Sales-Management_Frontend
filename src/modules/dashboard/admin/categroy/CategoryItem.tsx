import { Button } from '@/components/ui/button';
import type { ICategory } from '@/interfaces/category.interface';
import { cn } from '@/lib/utils';
import { ChevronDown, Folder, FolderOpen, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const CategoryItem = ({
  category,
  level = 0,
  onEdit,
  onDelete,
}: {
  category: ICategory;
  level?: number;
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}) => {
  const [open, setOpen] = useState(false);

  const hasChildren = !!category.children?.length;

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => hasChildren && setOpen(!open)}
          className="flex flex-1 items-center justify-between text-left"
        >
          <div
            className="flex items-center gap-3"
            style={{ paddingLeft: `${level * 12}px` }}
          >
            {open ? (
              <FolderOpen className="h-4 w-4 text-primary" />
            ) : (
              <Folder className="h-4 w-4 text-muted-foreground" />
            )}

            <span className="font-medium">{category.name}</span>
          </div>

          {hasChildren && (
            <ChevronDown
              className={cn(
                'mr-3 h-4 w-4 transition-transform',
                open && 'rotate-180'
              )}
            />
          )}
        </button>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(category)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(category)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open && hasChildren && (
        <div className="space-y-2 border-t px-3 py-3">
          {category.children?.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
