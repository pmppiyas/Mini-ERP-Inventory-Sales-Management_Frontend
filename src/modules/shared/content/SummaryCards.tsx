import type { IDashboardSummary } from '@/interfaces/dashboard.interface';
import {
  Package,
  FolderTree,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  summary: IDashboardSummary;
}

const fmt = (n: number) =>
  n >= 100000 ? '৳' + (n / 100000).toFixed(1) + 'L' : '৳' + n.toLocaleString();

const SummaryCards = ({ summary }: Props) => {
  const cards = [
    {
      label: 'Total Products',
      value: summary.totalProducts,
      icon: Package,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      link: '/admin/products',
    },
    {
      label: 'Categories',
      value: summary.totalCategories,
      icon: FolderTree,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      link: '/admin/categories',
    },
    {
      label: 'Employees',
      value: summary.totalEmployees,
      icon: Users,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      link: '/admin/users',
    },
    {
      label: 'Total Sales',
      value: summary.totalSales,
      icon: ShoppingCart,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      link: '/admin/sales',
    },
    {
      label: 'Total Revenue',
      value: fmt(summary.totalRevenue),
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      link: '/admin/sales',
    },
    {
      label: "Today's Sales",
      value: summary.todaySales,
      icon: Calendar,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      link: '/admin/sales?status=today',
    },
    {
      label: 'Low Stock',
      value: summary.lowStockProductsCount,
      icon: AlertTriangle,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      link: '/admin/products?status=low_stuck',
    },
    {
      label: 'Out of Stock',
      value: summary.outOfStockProductsCount,
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      link: '/admin/products?status=out_stuck',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link to={card.link}>
            <div
              key={card.label}
              className={`rounded-xl border ${card.border} bg-card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}
              >
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {card.label}
                </p>
                <p className="text-xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SummaryCards;
