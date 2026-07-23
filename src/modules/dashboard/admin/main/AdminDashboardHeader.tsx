import ReusableHeader from '@/modules/shared/ReusableHeader';
import { LayoutDashboard, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardHeader = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ReusableHeader
      icon={<LayoutDashboard className="h-5 w-5" />}
      title="Dashboard"
      description={today}
      actions={[
        {
          label: 'Make Sale',
          variant: 'default',
          onClick: () => navigate('/admin/sale/create'),
          icon: <Plus className="w-4 h-4" />,
        },
      ]}
    />
  );
};

export default AdminDashboardHeader;
