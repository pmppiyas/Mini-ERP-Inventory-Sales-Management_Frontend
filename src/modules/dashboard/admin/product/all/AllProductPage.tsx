import ProductHeader from '@/modules/dashboard/admin/product/all/AllProductHeader';
import ProductPageWrapper from '@/modules/dashboard/admin/product/all/AllProductWrapper';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { Suspense } from 'react';

const AllProductPage = () => {
  return (
    <div>
      <ProductHeader />
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageWrapper />
      </Suspense>
    </div>
  );
};

export default AllProductPage;
