import type { ISalesChartPoint } from '@/interfaces/dashboard.interface';
import { BarChart3 } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  chartData: ISalesChartPoint[];
}

const fmtLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const SalesChart = ({ chartData }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Card header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <BarChart3 className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Sales Overview</h2>
          <p className="text-xs text-muted-foreground">Last 7 days · Revenue & Sales count</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={fmtLabel}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              fontSize: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number, name: string) =>
              name === 'totalRevenue'
                ? ['৳' + value.toLocaleString(), 'Revenue']
                : [value, 'Sales']
            }
            labelFormatter={fmtLabel}
          />

          <Area
            type="monotone"
            dataKey="totalRevenue"
            stroke="hsl(var(--primary))"
            fill="url(#revGrad)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#10b981"
            fill="url(#salesGrad)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-3 h-0.5 rounded bg-primary" /> Revenue
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-3 h-0.5 rounded bg-emerald-500" /> Sales Count
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
