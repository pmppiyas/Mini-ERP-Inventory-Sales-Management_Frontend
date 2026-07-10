import LimitFilter from '@/modules/shared/LimitInput';
import ReusableHeader from '@/modules/shared/ReusableHeader';
import RoleFilter from '@/modules/shared/RoleFilter';
import SearchFilter from '@/modules/shared/SearchFilter';
import { Users } from 'lucide-react';

const AllUserHeader = () => {
  return (
    <ReusableHeader
      icon={<Users className="w-5 h-5" />}
      title="User Management"
      description="Manage all system users, their roles, and account information."
      components={[
        <RoleFilter key="role" />,
        <SearchFilter key="search" />,
        <LimitFilter key="limit" />,
      ]}
    />
  );
};

export default AllUserHeader;
