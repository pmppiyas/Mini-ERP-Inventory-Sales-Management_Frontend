import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardtLoading() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72  bg-background">
        {/* Logo */}
        <div className="flex h-20 items-center px-6 ">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="ml-3 h-6 w-36" />
        </div>

        {/* Menu */}
        <div className="space-y-4 p-5">
          <Skeleton className="h-5 w-20" />

          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>

        {/* Quick Actions */}
        <div className=" p-5">
          <Skeleton className="mb-4 h-5 w-28" />

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>

          <Skeleton className="mt-8 h-12 w-full rounded-xl" />
        </div>
      </aside>

      {/* Right */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-20 items-center justify-between  px-8">
          <Skeleton className="h-8 w-40" />

          <div className="flex items-center gap-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-44 rounded-full" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-96" />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Skeleton className="h-80 rounded-xl lg:col-span-2" />
              <Skeleton className="h-80 rounded-xl" />
            </div>

            <Skeleton className="h-72 rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
