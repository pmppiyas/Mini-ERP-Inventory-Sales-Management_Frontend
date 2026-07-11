import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Shield,
  Trash2,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '@/redux/features/user/user.api';

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 rounded-xl bg-muted" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h2 className="text-lg font-semibold">User Not Found</h2>

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const stats = [
    {
      label: 'Role',
      value: user.role,
      icon: Shield,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      label: 'Status',
      value: user.status,
      icon: CheckCircle2,
      color:
        user.status === 'ACTIVE'
          ? 'text-green-500 bg-green-500/10'
          : 'text-destructive bg-destructive/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <h1 className="text-lg font-bold">User Details</h1>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="relative bg-muted h-auto flex items-center justify-center">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>

                <p className="text-sm text-muted-foreground">
                  No Profile Picture
                </p>
              </div>
            )}

            <div className="absolute top-4 left-4">
              <Badge variant={user.status ? 'secondary' : 'destructive'}>
                {user.status}
              </Badge>
            </div>

            <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-white backdrop-blur">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-xs opacity-90">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-xl border bg-card p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-muted/30 p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>

                  <p className="font-semibold text-sm break-all">
                    {stat.value}
                  </p>
                </div>
              );
            })}
            {/* Permissions */}
            <div className="rounded-xl border bg-muted/30 p-4 space-y-3 col-span-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Permissions</span>
              </div>

              {user.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission: string) => (
                    <Badge key={permission} variant="secondary">
                      {permission
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No permissions assigned
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                Name
              </div>

              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                Number
              </div>

              <span className="font-medium">{user.phone ?? 'N/A'}</span>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </div>

              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Created
              </div>

              <span className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Updated
              </div>

              <span className="font-medium">
                {new Date(user.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => navigate(`/admin/users/${id}/edit`)}
            >
              Edit User
            </Button>

            <Button
              variant="outline"
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>

            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
