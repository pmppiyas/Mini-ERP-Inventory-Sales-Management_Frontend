import { useSearchParams } from 'react-router-dom';
import ProductContent from '@/modules/dashboard/admin/product/ProductContent';
import ErrorState from '@/modules/shared/ErrorState';
import PaginationComponent from '@/modules/shared/Pagination';
import ProductPageSkeleton from '@/modules/skeleton/ProductPageSkeleton';
import { useGetProductsQuery } from '@/redux/features/product/product.api';
import NotFoundData from '@/modules/shared/NotFoundData';

const ProductPageWrapper = () => {
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

  const { products, meta } = data || {};

  if (isLoading) return <ProductPageSkeleton />;

  if (error) return <ErrorState />;

  return (
    <div>
      {products?.length && products.length > 0 ? (
        <div>
          <ProductContent products={products} />
          <PaginationComponent
            currentPage={meta?.page ?? 1}
            totalPages={meta?.totalPage ?? 1}
          />
        </div>
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default ProductPageWrapper;
