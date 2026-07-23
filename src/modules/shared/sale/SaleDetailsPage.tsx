import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useGetSaleByIdQuery,
  useDeleteSaleMutation,
} from '@/redux/features/sale/sale.api';
import ConfirmModal from '@/modules/shared/ConfirmModal';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ShoppingCart,
  User,
  Package,
  Hash,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  Trash2,
  Mail,
} from 'lucide-react';

const SaleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const { data: sale, isLoading, error } = useGetSaleByIdQuery(id!);
  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

  const handleDelete = async () => {
    try {
      await deleteSale(id!).unwrap();
      toast.success('Sale deleted successfully.');
      navigate('/admin/sales');
    } catch {
      toast.error('Failed to delete sale.');
    }
  };

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted" />
          ))}
        </div>
        <div className="h-56 rounded-xl bg-muted" />
      </div>
    );
  }

  /* ── Error state ── */
  if (error || !sale) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold">Sale Not Found</h2>
        <p className="text-sm text-muted-foreground">
          This sale record does not exist or has been removed.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  /* ── Helpers ── */
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(n);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ── Stat cards data ── */
  const stats = [
    {
      label: 'Quantity',
      value: `${sale.quantity} unit${sale.quantity !== 1 ? 's' : ''}`,
      icon: Hash,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      label: 'Unit Price',
      value: fmt(sale.sellingPrice),
      icon: TrendingUp,
      color: 'text-violet-500 bg-violet-500/10',
    },
    {
      label: 'Total Amount',
      value: fmt(sale.totalAmount),
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Back + title ── */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Sale Details</h1>
          <p className="text-xs text-muted-foreground font-mono">{sale._id}</p>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main detail grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Product Info ── */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Product</h2>
          </div>

          <div className="space-y-3">
            <InfoRow label="Name" value={sale.productId?.name ?? '—'} />
            <InfoRow
              label="ID"
              value={
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {sale.productId?._id}
                </span>
              }
            />
            {sale.productId?.sellingPrice !== undefined && (
              <InfoRow
                label="Current Price"
                value={
                  <span className="text-emerald-600 font-semibold">
                    {fmt(sale.productId.sellingPrice)}
                  </span>
                }
              />
            )}
          </div>
        </div>

        {/* ── Seller Info ── */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <User className="h-4 w-4 text-violet-500" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Seller</h2>
          </div>

          <div className="space-y-3">
            <InfoRow
              label="Name"
              value={
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  {sale.sellerId?.name ?? '—'}
                </div>
              }
            />
            <InfoRow
              label="Email"
              value={
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {sale.sellerId?.email}
                </div>
              }
            />
            <InfoRow
              label="Seller ID"
              value={
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {sale.sellerId?._id}
                </span>
              }
            />
          </div>
        </div>

        {/* ── Sale Summary ── */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-emerald-500" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Sale Summary</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Quantity" value={`${sale.quantity} unit${sale.quantity !== 1 ? 's' : ''}`} />
            <InfoRow label="Unit Price" value={fmt(sale.sellingPrice)} />
            <InfoRow
              label="Total Amount"
              value={
                <span className="text-emerald-600 font-bold text-base">
                  {fmt(sale.totalAmount)}
                </span>
              }
            />
            <InfoRow
              label="Sale ID"
              value={
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {sale._id}
                </span>
              }
            />
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Timeline</span>
            </div>
            <InfoRow label="Created" value={`${fmtDate(sale.createdAt)} • ${fmtTime(sale.createdAt)}`} />
            <InfoRow label="Updated" value={`${fmtDate(sale.updatedAt)} • ${fmtTime(sale.updatedAt)}`} />
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
          onClick={() => setShowDelete(true)}
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Delete Sale
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back
        </Button>
      </div>

      {/* ── Confirm Delete ── */}
      <ConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Sale?"
        description="This sale record will be permanently deleted. This action cannot be undone."
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

/* ── Reusable info row ── */
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="text-muted-foreground shrink-0">{label}</span>
    <span className="font-medium text-foreground text-right">{value}</span>
  </div>
);

export default SaleDetailsPage;
