import ProductHeader from '@/modules/dashboard/admin/product/ProductHeader';
import ProductPageWrapper from '@/modules/dashboard/admin/product/ProductPageWrapper';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { Suspense } from 'react';

const ProductPage = () => {
  return (
    <div>
      <ProductHeader />
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageWrapper />
      </Suspense>
    </div>
  );
};

export default ProductPage;
