import type { IUserMeta } from '@/interfaces/user.interface';
import AllUserHeader from '@/modules/dashboard/admin/user/all/AllUserHeader';
import AllUserPage from '@/modules/dashboard/admin/user/all/AllUserPage';
import PaginationComponent from '@/modules/shared/Pagination';
import { useGetUsersQuery } from '@/redux/features/user/user.api';
import { useSearchParams } from 'react-router-dom';

const AllUserWrapper = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const role = searchParams.get('role') || undefined;

  const { data, isLoading } = useGetUsersQuery({
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
      <AllUserHeader />
      <AllUserPage users={users} isLoading={isLoading} />
      {users.length === meta.limit && (
        <PaginationComponent
          currentPage={meta.page}
          totalPages={meta.totalPage}
        />
      )}
    </div>
  );
};

export default AllUserWrapper;
