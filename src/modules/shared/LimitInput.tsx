import { useSearchParams } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LimitFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get('limit') || '10';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('limit', value);
    params.set('page', '1');

    setSearchParams(params);
  };

  return (
    <Select value={limit} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LimitFilter;
