import { useSearchParams } from 'react-router-dom';
import { useGetSalesQuery } from '@/redux/features/sale/sale.api';
import type { ISaleMeta } from '@/interfaces/sale.interface';
import AllSaleContent from '@/modules/dashboard/admin/sale/AllSaleContent';
import PaginationComponent from '@/modules/shared/Pagination';
import ErrorState from '@/modules/shared/ErrorState';
import NotFoundData from '@/modules/shared/NotFoundData';

const AllSaleWrapper = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 12;
  const fromDate = searchParams.get('fromDate') || undefined;
  const toDate = searchParams.get('toDate') || undefined;
  const sortBy = searchParams.get('sortBy') || '-createdAt';

  const { data, isLoading, error } = useGetSalesQuery({
    page,
    limit,
    fromDate,
    toDate,
    sortBy,
  });

  const { sales = [], meta = {} as ISaleMeta } = data ?? {};

  if (error) return <ErrorState />;

  return (
    <div>
      {isLoading || sales.length > 0 ? (
        <div className="space-y-4">
          <AllSaleContent sales={sales} isLoading={isLoading} />
          {meta?.totalPage > 1 && (
            <PaginationComponent
              currentPage={meta.page}
              totalPages={meta.totalPage}
            />
          )}
        </div>
      ) : (
        <NotFoundData
          title="No Sales Found"
          description="Try adjusting the date range filter."
        />
      )}
    </div>
  );
};

export default AllSaleWrapper;
