import type { IRecentSale } from '@/interfaces/dashboard.interface';
import { Package, ShoppingCart } from 'lucide-react';

interface Props {
  sales: IRecentSale[];
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const RecentSales = ({ sales }: Props) => {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <ShoppingCart className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Recent Sales</h2>
          <p className="text-xs text-muted-foreground">{sales.length} transactions</p>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {sales.slice(0, 8).map((sale, i) => (
          <div key={i} className="flex items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {sale.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {sale.sellerName} · {sale.quantity} unit{sale.quantity !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-foreground">
                ৳{sale.totalAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {fmtDate(sale.createdAt)} · {fmtTime(sale.createdAt)}
              </p>
            </div>
          </div>
        ))}

        {sales.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No sales yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentSales;
