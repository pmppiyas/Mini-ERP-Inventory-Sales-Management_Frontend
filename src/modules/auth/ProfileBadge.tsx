import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileBadgeProps {
  me?: {
    name: string;
    role: string;
    email: string;
  };
}

export default function ProfileBadge({ me }: ProfileBadgeProps) {
  const initials = me?.name?.slice(0, 2).toUpperCase() ?? 'AD';

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9 shrink-0 ring-2 ring-border">
        <AvatarImage src={''} alt={me?.name} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0 flex flex-col items-start justify-start">
        <p className="text-foreground text-sm font-semibold truncate leading-none">
          {me?.name ?? 'Admin User'}
        </p>
        <p className="text-muted-foreground text-[11px] mt-1 truncate capitalize">
          {me?.role ?? 'Administrator'}
        </p>
      </div>

      {/* Online indicator */}
      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
    </div>
  );
}
