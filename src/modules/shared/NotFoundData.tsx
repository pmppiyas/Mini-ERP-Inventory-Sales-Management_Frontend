import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotFoundDataProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonPath?: string;
}

const NotFoundData = ({
  title = 'No Data Found',
  description = 'We could not find any records matching your request.',
  buttonText,
  buttonPath,
}: NotFoundDataProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
      <div className="mb-5 rounded-full bg-muted p-5">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {buttonText && buttonPath && (
        <Button className="mt-6" onClick={() => navigate(buttonPath)}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default NotFoundData;
