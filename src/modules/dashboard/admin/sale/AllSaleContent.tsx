import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import DataTable, { type ColumnDef } from '@/components/shared/DataTable';
import ConfirmModal from '@/modules/shared/ConfirmModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';

import type { ISale } from '@/interfaces/sale.interface';
import { useDeleteSaleMutation } from '@/redux/features/sale/sale.api';

interface AllSaleContentProps {
  sales: ISale[];
  isLoading?: boolean;
}

const AllSaleContent = ({ sales, isLoading = false }: AllSaleContentProps) => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<ISale | null>(null);
  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSale(deleteTarget._id).unwrap();
      toast.success('Sale deleted.');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete sale.');
    }
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(n);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const columns: ColumnDef<ISale>[] = [
    /* ── # ── */
    {
      key: 'index',
      header: '#',
      width: '48px',
      align: 'center',
      render: (_row, index) => (
        <span className="text-xs text-muted-foreground">{index + 1}</span>
      ),
    },

    /* ── Product ── */
    {
      key: 'product',
      header: 'Product',
      render: (row) => (
        <p className="font-medium text-foreground text-sm">
          {row.productId?.name ?? '—'}
        </p>
      ),
    },

    /* ── Seller ── */
    {
      key: 'seller',
      header: 'Seller',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {row.sellerId?.name ?? '—'}
          </p>
          <p className="text-xs text-muted-foreground">{row.sellerId?.email}</p>
        </div>
      ),
    },

    /* ── Qty ── */
    {
      key: 'quantity',
      header: 'Qty',
      width: '60px',
      align: 'center',
      render: (row) => (
        <Badge variant="outline" className="text-xs">
          {row.quantity}
        </Badge>
      ),
    },

    /* ── Unit Price ── */
    {
      key: 'sellingPrice',
      header: 'Unit Price',
      width: '110px',
      align: 'right',
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {fmt(row.sellingPrice)}
        </span>
      ),
    },

    /* ── Total ── */
    {
      key: 'totalAmount',
      header: 'Total',
      width: '120px',
      align: 'right',
      render: (row) => (
        <span className="text-sm font-semibold text-foreground">
          {fmt(row.totalAmount)}
        </span>
      ),
    },

    /* ── Date ── */
    {
      key: 'createdAt',
      header: 'Date',
      width: '110px',
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {fmtDate(row.createdAt)}
        </span>
      ),
    },

    /* ── Actions ── */
    {
      key: 'actions',
      header: '',
      width: '48px',
      align: 'center',
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => navigate(`/admin/sale/${row._id}`)}
              className="gap-2 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" /> View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteTarget(row)}
              className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable<ISale>
        columns={columns}
        data={sales}
        keyField="_id"
        isLoading={isLoading}
        skeletonRows={12}
        emptyMessage="No sales found."
      />

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Sale?"
        description="This sale record will be permanently deleted."
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </>
  );
};

export default AllSaleContent;
