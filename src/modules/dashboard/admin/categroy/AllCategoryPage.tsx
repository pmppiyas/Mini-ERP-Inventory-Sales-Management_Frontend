import AllCategoryHeader from '@/modules/dashboard/admin/categroy/AllCategoryHeader';
import AllCategoryWrapper from '@/modules/dashboard/admin/categroy/AllCategoryWrapper';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { Suspense } from 'react';

const AllCategoryPage = () => {
  return (
    <div>
      <AllCategoryHeader />
      <Suspense fallback={<ProductPageSkeleton />}>
        <AllCategoryWrapper />
      </Suspense>
    </div>
  );
};

export default AllCategoryPage;
