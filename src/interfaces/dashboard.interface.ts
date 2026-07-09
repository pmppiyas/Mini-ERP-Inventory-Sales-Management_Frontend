export interface ISidebarItem {
  section: string;
  items: Array<{
    id: string;
    label: string;
    path?: string;
    icon: React.ComponentType;
    component?: React.ComponentType;
    index?: boolean;
    badge?: string;
    noRoute?: boolean;
  }>;
}
