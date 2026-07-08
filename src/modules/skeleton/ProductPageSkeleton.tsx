import { Skeleton } from '@/components/ui/skeleton';

const ProductPageSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-lg border p-4 space-y-4">
            <Skeleton className="h-48 w-full rounded-md" />

            <div className="space-y-2">
              <Skeleton className="h-6 w-2/3" />

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
