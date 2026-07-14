import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDeleteUserMutation } from '@/redux/features/user/user.api';

import DataTable, { type ColumnDef } from '@/components/shared/DataTable';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  UserCircle2,
  ShieldCheck,
} from 'lucide-react';
import { type IUser, Status } from '@/interfaces/user.interface';
import ConfirmModal from '@/modules/shared/ConfirmModal';

const roleBadge: Record<string, string> = {
  ADMIN: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  MANAGER: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  EMPLOYEE: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

interface AllUserContentProps {
  users: IUser[];
  isLoading?: boolean;
}

const AllUserContent = ({ users, isLoading = false }: AllUserContentProps) => {
  const navigate = useNavigate();

  const [deleteTarget, setDeleteTarget] = useState<IUser | null>(null);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser(deleteTarget._id).unwrap();
      toast.success(`"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete user.');
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      key: 'photo',
      header: '#',
      width: '56px',
      align: 'center',
      render: (row) =>
        row.photoUrl ? (
          <img
            src={row.photoUrl}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover mx-auto ring-2 ring-border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <UserCircle2 className="w-5 h-5 text-primary" />
          </div>
        ),
    },

    {
      key: 'name',
      header: 'Name',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{row.email}</p>
        </div>
      ),
    },

    {
      key: 'phone',
      header: 'Phone',
      width: '130px',
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.phone ?? '—'}
        </span>
      ),
    },

    {
      key: 'role',
      header: 'Role',
      width: '110px',
      render: (row) => (
        <Badge
          variant="outline"
          className={`text-[10px] font-semibold px-2 py-0.5 ${roleBadge[row.role] ?? ''}`}
        >
          {row.role}
        </Badge>
      ),
    },

    {
      key: 'status',
      header: 'Status',
      width: '90px',
      align: 'center',
      render: (row) => {
        const isActive = row.status === Status.ACTIVE;
        const isBlocked = row.status === Status.BLOCK;
        return (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              isActive
                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                : isBlocked
                  ? 'bg-destructive/10 text-destructive border-destructive/20'
                  : 'bg-muted text-muted-foreground border-border'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive
                  ? 'bg-green-500'
                  : isBlocked
                    ? 'bg-destructive'
                    : 'bg-muted-foreground'
              }`}
            />
            {row.status}
          </span>
        );
      },
    },

    {
      key: 'createdAt',
      header: 'Joined',
      width: '100px',
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },

    /* ── 3-dot Actions ── */
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

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => navigate(`/admin/user/${row._id}`)}
              className="gap-2 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" /> View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(`/admin/user/${row._id}/edit`)}
              className="gap-2 cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" /> Update
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(`/admin/user/${row._id}/permission`)}
              className="gap-2 cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Set Permission
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
      <DataTable<IUser>
        columns={columns}
        data={users}
        keyField="_id"
        isLoading={isLoading}
        skeletonRows={10}
        emptyMessage="No users found."
        onRowClick={(row) => navigate(`/admin/user/${row._id}`)}
      />

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete User?"
        description={`"${deleteTarget?.name}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </>
  );
};

export default AllUserContent;
