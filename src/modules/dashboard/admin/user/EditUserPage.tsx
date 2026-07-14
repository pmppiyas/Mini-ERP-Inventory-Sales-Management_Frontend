import { Button } from '@/components/ui/button';
import UserFormPage from '@/modules/shared/user/UserFormPage';
import { useGetUserByIdQuery } from '@/redux/features/user/user.api';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-muted" />
          <div className="space-y-1.5">
            <div className="h-5 w-32 rounded bg-muted" />
            <div className="h-3 w-48 rounded bg-muted" />
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 rounded-xl bg-muted" />
          <div className="rounded-xl bg-muted h-80 space-y-4 p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted/60" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          User Not Found
        </h2>
        <p className="text-sm text-muted-foreground">
          Could not load the product. It may have been deleted.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return <UserFormPage user={user} mode="edit" />;
};

export default EditUserPage;
