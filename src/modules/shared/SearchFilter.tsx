import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface SearchFilterProps {
  placeholder?: string;
  debounceMs?: number;
}

const SearchFilter = ({
  placeholder = 'Search...',
  debounceMs = 400,
}: SearchFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(searchParams.get('searchTerm') || '');

  // sync if URL changes externally (e.g. clear from outside)
  useEffect(() => {
    setValue(searchParams.get('searchTerm') || '');
  }, [searchParams.get('searchTerm')]);

  // debounce → update URL
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set('searchTerm', value.trim());
      } else {
        params.delete('searchTerm');
      }
      params.set('page', '1');
      setSearchParams(params, { replace: true });
    }, debounceMs);

    return () => clearTimeout(t);
  }, [value]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8 w-52"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
