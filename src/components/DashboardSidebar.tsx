
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookTemplate, Users, Settings, BarChart, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Boards', href: '/boards', icon: BookTemplate },
  { name: 'Templates', href: '/templates', icon: BookTemplate },
  { name: 'Team', href: '/team/invite', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-border/40 p-4 h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
