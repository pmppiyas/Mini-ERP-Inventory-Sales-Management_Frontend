import AllUserHeader from '@/modules/dashboard/admin/user/all/AllUserHeader';
import AllUserWrapper from '@/modules/dashboard/admin/user/all/AllUserWrapper';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { Suspense } from 'react';

const AllUserPage = () => {
  return (
    <div>
      <AllUserHeader />
      <Suspense fallback={<ProductPageSkeleton />}>
        <AllUserWrapper />
      </Suspense>
    </div>
  );
};

export default AllUserPage;
