import { Search } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFilterProps {
  placeholder?: string;
}

const SearchFilter = ({ placeholder = 'Search...' }: SearchFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get('searchTerm') || ''
  );

  useEffect(() => {
    setSearchInput(searchParams.get('searchTerm') || '');
  }, [searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (searchInput.trim()) {
      params.set('searchTerm', searchInput.trim());
    } else {
      params.delete('searchTerm');
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 max-w-sm w-full"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchFilter;
