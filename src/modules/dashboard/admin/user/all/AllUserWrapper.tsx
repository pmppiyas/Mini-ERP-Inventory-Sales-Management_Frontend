import type { IUserMeta } from '@/interfaces/user.interface';
import AllUserContent from '@/modules/dashboard/admin/user/all/AllUserContent';
import NotFoundData from '@/modules/shared/NotFoundData';
import PaginationComponent from '@/modules/shared/Pagination';
import { useGetUsersQuery } from '@/redux/features/user/user.api';
import { useSearchParams } from 'react-router-dom';

const AllUserWrapper = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const role = searchParams.get('role') || undefined;

  const { data } = useGetUsersQuery({
    page,
    limit,
    role,
    searchTerm,
  });

  const { users, meta } = data ?? {
    users: [],
    meta: {} as IUserMeta,
  };

  return (
    <div>
      {users?.length && users.length > 0 ? (
        <div>
          <AllUserContent users={users} />
          {users.length === meta.limit && (
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
