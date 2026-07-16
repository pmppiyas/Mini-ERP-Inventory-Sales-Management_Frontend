import ReusableHeader from '@/modules/shared/ReusableHeader';
import { FolderTree, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllCategoryHeader = () => {
  const navigate = useNavigate();

  return (
    <ReusableHeader
      icon={<FolderTree className="h-5 w-5" />}
      title="Category Management"
      description="Organize your products by creating and managing categories for better inventory management."
      actions={[
        {
          label: 'Add Category',
          variant: 'default',
          onClick: () => navigate('/admin/categories/create'),
          icon: <Plus className="h-4 w-4" />,
        },
      ]}
    />
  );
};

export default AllCategoryHeader;
