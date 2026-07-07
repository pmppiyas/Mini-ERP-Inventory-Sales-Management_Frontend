import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileBadgeProps {
  me: {
    name: string;
    role: string;
    email: string;
  };
}

export default function ProfileBadge({ me }: ProfileBadgeProps) {
  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
          <AvatarFallback className="bg-primary/10">
            {me?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <div className="flex items-center justify-center gap-2">
            <p className="font-semibold text-sm truncate">{me.name}</p>
            <p className="text-xs truncate">( {me.role} )</p>
          </div>
          <p className="text-xs text-muted-foreground truncate">{me.email}</p>
        </div>
      </div>
    </div>
  );
}
