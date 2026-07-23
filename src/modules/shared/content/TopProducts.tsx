import type { ITopSellingProduct } from '@/interfaces/dashboard.interface';
import { Trophy } from 'lucide-react';

interface Props {
  products: ITopSellingProduct[];
}

const TopProducts = ({ products }: Props) => {
  const maxSold = products[0]?.totalQuantitySold || 1;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <Trophy className="h-4 w-4 text-amber-500" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Top Products</h2>
          <p className="text-xs text-muted-foreground">By sales volume</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {products.map((p, i) => {
          const pct = Math.min(100, (p.totalQuantitySold / maxSold) * 100);
          return (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">
                    #{i + 1}
                  </span>
                  <p className="text-xs font-medium text-foreground truncate">
                    {p.productName}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {p.totalQuantitySold} sold
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-right text-emerald-600 font-medium">
                ৳{p.totalRevenue.toLocaleString()}
              </p>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">No data yet.</p>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
