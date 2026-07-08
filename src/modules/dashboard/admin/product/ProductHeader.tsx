import CategoryFilter from '@/modules/shared/CategoryFilter';
import ReusableHeader from '@/modules/shared/ReusableHeader';
import { Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = () => {
  const navigate = useNavigate();

  return (
    <ReusableHeader
      icon={<Package className="w-5 h-5" />}
      title="Product Management"
      description="Manage your inventory, add new products, and monitor stock levels."
      actions={[
        {
          label: 'Add Product',
          variant: 'default',
          onClick: () => navigate('/admin/products/create'),
          icon: <Plus className="w-4 h-4" />,
        },
        // {
        //   label: 'All Products',
        //   variant: 'outline',
        //   onClick: () => navigate('/admin/products'),
        //   icon: <Boxes className="w-4 h-4" />,
        // },
        // {
        //   label: 'Low Stock',
        //   variant: 'ghost',
        //   onClick: () => navigate('/admin/products?stock=low'),
        //   icon: <AlertTriangle className="w-4 h-4" />,
        // },
      ]}
      components={[<CategoryFilter key="category" />]}
    />
  );
};

export default ProductHeader;
