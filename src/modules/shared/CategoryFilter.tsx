import { useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '@/redux/features/category/category.api';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CategoryFilter = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  return (
    <Select
      value={selectedCategory || 'all'}
      onValueChange={handleChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>

        {categories?.map((category) => (
          <SelectItem key={category._id} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
