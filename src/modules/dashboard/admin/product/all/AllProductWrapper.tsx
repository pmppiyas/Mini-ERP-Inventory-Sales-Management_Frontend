import { useSearchParams } from 'react-router-dom';
import ErrorState from '@/modules/shared/ErrorState';
import PaginationComponent from '@/modules/shared/Pagination';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { useGetProductsQuery } from '@/redux/features/product/product.api';
import NotFoundData from '@/modules/shared/NotFoundData';
import AllProductPage from '@/modules/dashboard/admin/product/all/AllProductContent';
import type { IProductMeta } from '@/interfaces/product.interface';

const AllProductWrapper = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const category = searchParams.get('category') || undefined;
  const searchTerm = searchParams.get('search') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    limit,
    category,
    searchTerm,
    sort,
  });

  const { products, meta } = data ?? {
    users: [],
    meta: {} as IProductMeta,
  };

  if (isLoading) return <ProductPageSkeleton />;

  if (error) return <ErrorState />;

  return (
    <div>
      {products?.length && products.length > 0 ? (
        <div>
          <AllProductPage products={products} />
          {products.length === meta.limit && (
            <PaginationComponent
              currentPage={meta.page}
              totalPages={meta.totalPage}
            />
          )}
        </div>
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default AllProductWrapper;
