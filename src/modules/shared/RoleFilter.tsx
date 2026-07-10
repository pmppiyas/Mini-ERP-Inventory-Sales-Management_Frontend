import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

const ROLES = ['ADMIN', 'MANAGER', 'EMPLOYEE'];

const RoleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const role = searchParams.get('role') || 'all';

  const handleRoleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('role');
    } else {
      params.set('role', value);
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  return (
    <Select value={role} onValueChange={handleRoleFilter}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="All Roles" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>

        {ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleFilter;
