
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

interface Activity {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  targetId?: string;
  targetType?: string;
  targetName?: string;
}

interface TeamActivitiesProps {
  activities: Activity[];
  users: User[];
}

const TeamActivities: React.FC<TeamActivitiesProps> = ({ activities, users }) => {
  // Find user by ID
  const findUser = (userId: string) => users.find(user => user.id === userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Activities</CardTitle>
        <CardDescription>Recent activities from your team members</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => {
              const user = findUser(activity.userId);
              if (!user) return null;
              
              return (
                <div key={activity.id} className="flex items-start gap-3 border-b border-border/30 pb-3 last:border-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{user.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString(undefined, { timeStyle: 'short', dateStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                      {activity.targetName && <span className="font-medium text-foreground"> {activity.targetName}</span>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No recent team activities.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamActivities;
