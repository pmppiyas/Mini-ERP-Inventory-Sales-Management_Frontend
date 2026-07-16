import CategoryAccordion from '@/modules/dashboard/admin/categroy/CategoryAccrodian';
import ErrorState from '@/modules/shared/ErrorState';
import NotFoundData from '@/modules/shared/NotFoundData';
import { useGetCategoriesQuery } from '@/redux/features/category/category.api';

const AllCategoryWrapper = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-14 rounded-xl border bg-card animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState />;

  return (
    <div>
      {categories && categories.length > 0 ? (
        <CategoryAccordion categories={categories} />
      ) : (
        <NotFoundData
          title="No Categories Yet"
          description="Add your first category to get started."
        />
      )}
    </div>
  );
};

export default AllCategoryWrapper;
