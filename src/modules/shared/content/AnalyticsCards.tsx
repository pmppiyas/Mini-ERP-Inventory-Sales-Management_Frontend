import type { IDashboardSalesAnalytics } from '@/interfaces/dashboard.interface';
import { TrendingUp } from 'lucide-react';

interface Props {
  analytics: IDashboardSalesAnalytics;
}

const fmt = (n: number) => '৳' + n.toLocaleString('en-US');

const AnalyticsCards = ({ analytics }: Props) => {
  const cards = [
    {
      label: "Today's Revenue",
      value: fmt(analytics.todayRevenue),
      color: 'text-cyan-500',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/10',
    },
    {
      label: 'This Week',
      value: fmt(analytics.thisWeekRevenue),
      color: 'text-blue-500',
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'This Month',
      value: fmt(analytics.thisMonthRevenue),
      color: 'text-violet-500',
      border: 'border-violet-500/20',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'This Year',
      value: fmt(analytics.thisYearRevenue),
      color: 'text-emerald-500',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border ${card.border} bg-card p-4 space-y-2`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${card.bg}`}
            >
              <TrendingUp className={`h-3.5 w-3.5 ${card.color}`} />
            </div>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </div>
          <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
