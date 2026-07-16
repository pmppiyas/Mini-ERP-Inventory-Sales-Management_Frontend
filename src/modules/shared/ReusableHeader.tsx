import { Button } from '@/components/ui/button';
import React from 'react';

interface IAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

interface ReusableHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: IAction[];
  currentStatus?: string;
  filter?: boolean;
  components?: React.ReactNode[];
}

const ReusableHeader = ({
  icon,
  title,
  description,
  actions = [],
  components = [],
}: ReusableHeaderProps) => {
  return (
    <header className="container max-w-7xl mx-auto px-6 py-6 rounded-xl mb-6 border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex gap-4 items-center">
          {icon && (
            <div className="p-3 bg-primary text-primary-foreground rounded-xl shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side — actions + filter components */}
        <div className="flex flex-wrap gap-2 items-center">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'default'}
              onClick={action.onClick}
              className="flex items-center gap-2 font-medium"
            >
              {action.icon && action.icon}
              {action.label}
            </Button>
          ))}
          {components.map((component, index) => (
            <React.Fragment key={index}>{component}</React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ReusableHeader;
