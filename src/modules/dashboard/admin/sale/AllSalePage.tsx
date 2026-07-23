import AllSaleHeader from '@/modules/dashboard/admin/sale/AllSaleHeader';
import AllSaleWrapper from '@/modules/dashboard/admin/sale/AllSaleWrapper';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { Suspense } from 'react';

const AllSalePage = () => {
  return (
    <div>
      <AllSaleHeader />
      <Suspense fallback={<ProductPageSkeleton />}>
        <AllSaleWrapper />
      </Suspense>
    </div>
  );
};

export default AllSalePage;
