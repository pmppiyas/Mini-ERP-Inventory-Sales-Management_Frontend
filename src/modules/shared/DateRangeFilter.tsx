import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const DateRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  const setDate = (key: 'fromDate' | 'toDate', value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, new Date(value).toISOString());
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const toInputDate = (iso: string) =>
    iso ? new Date(iso).toISOString().split('T')[0] : '';

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          From
        </span>
        <Input
          type="date"
          className="h-8 w-36 text-xs"
          value={toInputDate(fromDate)}
          onChange={(e) => setDate('fromDate', e.target.value)}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          To
        </span>
        <Input
          type="date"
          className="h-8 w-36 text-xs"
          value={toInputDate(toDate)}
          onChange={(e) => setDate('toDate', e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
