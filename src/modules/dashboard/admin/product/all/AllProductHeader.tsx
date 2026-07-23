import CategoryFilter from '@/modules/shared/CategoryFilter';
import LimitFilter from '@/modules/shared/LimitInput';
import ReusableHeader from '@/modules/shared/ReusableHeader';
import SearchFilter from '@/modules/shared/SearchFilter';
import { Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllProductHeader = () => {
  const navigate = useNavigate();

  return (
    <ReusableHeader
      icon={<Package className="w-5 h-5" />}
      actions={[
        {
          label: 'Add Product',
          variant: 'default',
          onClick: () => navigate('/admin/products/create'),
          icon: <Plus className="w-4 h-4" />,
        },
      ]}
      components={[
        <CategoryFilter key="category" />,
        <LimitFilter key="limit" />,
        <SearchFilter key="search" />,
      ]}
    />
  );
};

export default AllProductHeader;
