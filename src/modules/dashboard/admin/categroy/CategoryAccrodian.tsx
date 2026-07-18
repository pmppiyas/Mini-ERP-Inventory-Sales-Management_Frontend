import { useState } from 'react';
import { toast } from 'sonner';
import type { ICategory } from '@/interfaces/category.interface';
import { useDeleteCategoryMutation } from '@/redux/features/category/category.api';
import { CategoryItem } from '@/modules/dashboard/admin/categroy/CategoryItem';
import CategoryModal from '@/modules/dashboard/admin/categroy/CategoryModal';
import ConfirmModal from '@/modules/shared/ConfirmModal';

const CategoryAccordion = ({ categories }: { categories: ICategory[] }) => {
  const [editTarget, setEditTarget] = useState<ICategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleEdit = (cat: ICategory) => setEditTarget(cat);
  const handleDelete = (cat: ICategory) => setDeleteTarget(cat);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget._id).unwrap();
      toast.success(`"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete category.');
    }
  };

  return (
    <>
      <div className="space-y-3">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* EDIT —  */}
      <CategoryModal
        mode="UPDATE"
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        category={editTarget}
        categories={categories}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Category?"
        description={`"${deleteTarget?.name}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </>
  );
};

export default CategoryAccordion;
