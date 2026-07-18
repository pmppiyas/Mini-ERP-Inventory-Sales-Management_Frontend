import { useState } from 'react';
import { FolderTree, Plus } from 'lucide-react';

import ReusableHeader from '@/modules/shared/ReusableHeader';
import CategoryModal from './CategoryModal';

const AllCategoryHeader = () => {
  const [open, setOpen] = useState(false);

  const categories = [
    {
      _id: '2345678654345',
      name: 'Piyas',
      slug: 'piyas',
    },
  ];

  return (
    <>
      <ReusableHeader
        icon={<FolderTree className="h-5 w-5" />}
        title="Category Management"
        description="Organize your products by creating and managing categories for better inventory management."
        actions={[
          {
            label: 'Add Category',
            variant: 'default',
            onClick: () => setOpen(true),
            icon: <Plus className="h-4 w-4" />,
          },
        ]}
      />

      <CategoryModal
        mode="CREATE"
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
      />
    </>
  );
};

export default AllCategoryHeader;
