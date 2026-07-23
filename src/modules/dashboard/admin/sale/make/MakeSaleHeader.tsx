import ReusableHeader from '@/modules/shared/ReusableHeader';
import { ShoppingCart } from 'lucide-react';

const MakeSaleHeader = () => {
  return (
    <ReusableHeader
      icon={<ShoppingCart className="h-5 w-5" />}
      title="Make Sale"
      description="Search products, set quantity & price, then submit."
    />
  );
};

export default MakeSaleHeader;
