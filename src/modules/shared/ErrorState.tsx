import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading the data. Please try again.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} className="mt-6">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
