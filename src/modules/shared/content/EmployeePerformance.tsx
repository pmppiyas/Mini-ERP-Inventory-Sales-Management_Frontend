import type { IEmployeePerformance } from '@/interfaces/dashboard.interface';
import { UserCheck, Users } from 'lucide-react';

interface Props {
  employees: IEmployeePerformance[];
}

const EmployeePerformance = ({ employees }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <UserCheck className="h-4 w-4 text-violet-500" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Performance</h2>
          <p className="text-xs text-muted-foreground">Employee revenue</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {employees.map((emp, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                <Users className="h-3.5 w-3.5 text-violet-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {emp.employeeName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {emp.numberOfSales} sale{emp.numberOfSales !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 shrink-0">
              ৳{emp.revenueGenerated.toLocaleString()}
            </span>
          </div>
        ))}

        {employees.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No data yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeePerformance;
