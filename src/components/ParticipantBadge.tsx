
import React from 'react';
import { User, UserRole } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface ParticipantBadgeProps {
  user: User;
  role?: UserRole;
  showStatus?: boolean;
  showName?: boolean;
}

const ParticipantBadge: React.FC<ParticipantBadgeProps> = ({ 
  user, 
  role, 
  showStatus = true,
  showName = false
}) => {
  const roleColors = {
    owner: 'bg-amber-500',
    admin: 'bg-purple-500',
    participant: 'bg-blue-500'
  };

  const roleLabels = {
    owner: 'Owner',
    admin: 'Admin',
    participant: 'Participant'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`relative inline-flex items-center ${showName ? 'gap-2' : ''}`}>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {showStatus && (
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
            
            {showName && (
              <span className="text-sm font-medium">{user.name}</span>
            )}
            
            {role && (
              <Badge 
                variant="secondary" 
                className={`absolute -top-2 -right-2 px-1 py-0 text-[10px] leading-tight text-white ${roleColors[role]}`}
              >
                {role === 'owner' ? 'O' : role === 'admin' ? 'A' : 'P'}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-muted-foreground">{user.email}</span>
            {role && <span className="mt-1">{roleLabels[role]}</span>}
            <span className="flex items-center gap-1 mt-1">
              <span className={`h-2 w-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>{user.isOnline ? 'Online' : 'Offline'}</span>
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ParticipantBadge;
