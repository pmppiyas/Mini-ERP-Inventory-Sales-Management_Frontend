import { useGetDashboardMetaQuery } from '@/redux/features/dashboard/dashboard.api';
import { AlertTriangle } from 'lucide-react';
import SummaryCards from '@/modules/shared/content/SummaryCards';
import AnalyticsCards from '@/modules/shared/content/AnalyticsCards';
import SalesChart from '@/modules/shared/content/SalesChart';
import RecentSales from '@/modules/shared/content/RecentSales';
import TopProducts from '@/modules/shared/content/TopProducts';
import EmployeePerformance from '@/modules/shared/content/EmployeePerformance';

/* Loading skeleton */
const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-muted" />
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-muted" />
      ))}
    </div>
    <div className="h-64 rounded-xl bg-muted" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 h-80 rounded-xl bg-muted" />
      <div className="h-80 rounded-xl bg-muted" />
    </div>
  </div>
);

const AdminDashboardWrapper = () => {
  const { data, isLoading, error } = useGetDashboardMetaQuery();

  if (isLoading) return <DashboardSkeleton />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <p className="text-sm text-muted-foreground">
          Failed to load dashboard data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 8 summary stat cards */}
      <SummaryCards summary={data.summary} />

      {/* 4 revenue analytics cards */}
      <AnalyticsCards analytics={data.salesAnalytics} />

      {/* 7-day area chart */}
      <SalesChart chartData={data.salesChart} />

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RecentSales sales={data.recentSales} />
        <div className="space-y-5">
          <TopProducts products={data.topSellingProducts} />
          <EmployeePerformance employees={data.employeePerformance} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWrapper;
