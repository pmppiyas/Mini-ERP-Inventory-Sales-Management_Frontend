import ReusableHeader from '@/modules/shared/ReusableHeader';
import DateRangeFilter from '@/modules/shared/DateRangeFilter';
import LimitFilter from '@/modules/shared/LimitInput';
import { ShoppingCart } from 'lucide-react';
import { useGetSalesQuery } from '@/redux/features/sale/sale.api';

const AllSaleHeader = () => {
  const { data } = useGetSalesQuery({});

  const total = data?.meta?.total ?? 0;

  return (
    <ReusableHeader
      icon={<ShoppingCart className="w-5 h-5" />}
      title="Sales"
      description={`${total} total sale${total !== 1 ? 's' : ''} recorded`}
      components={[
        <DateRangeFilter key="date" />,
        <LimitFilter key="limit" />,
      ]}
    />
  );
};

export default AllSaleHeader;
