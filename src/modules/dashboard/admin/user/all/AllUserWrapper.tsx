import type { IUserMeta } from '@/interfaces/user.interface';
import AllUserContent from '@/modules/dashboard/admin/user/all/AllUserContent';
import ErrorState from '@/modules/shared/ErrorState';
import NotFoundData from '@/modules/shared/NotFoundData';
import PaginationComponent from '@/modules/shared/Pagination';
import { useGetUsersQuery } from '@/redux/features/user/user.api';
import { useSearchParams } from 'react-router-dom';

const AllUserWrapper = () => {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('searchTerm') || undefined;
  const page       = Number(searchParams.get('page'))  || 1;
  const limit      = Number(searchParams.get('limit')) || 10;
  const role       = searchParams.get('role') || undefined;

  const { data, isLoading, error } = useGetUsersQuery({
    page,
    limit,
    role,
    searchTerm,
  });

  const { users, meta } = data ?? {
    users: [],
    meta: {} as IUserMeta,
  };

  if (error) return <ErrorState />;

  return (
    <div>
      {isLoading || (users && users.length > 0) ? (
        <div className="space-y-4">
          <AllUserContent users={users} isLoading={isLoading} />
          {meta?.totalPage > 1 && (
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

export default AllUserWrapper;
