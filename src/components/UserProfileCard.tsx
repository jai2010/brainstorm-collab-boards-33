
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, BarChart } from 'lucide-react';
import { User as UserType } from '@/types';

interface UserProfileCardProps {
  user: UserType;
  usageCredits: {
    used: number;
    total: number;
    remaining: number;
    daysUntilRenewal: number;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, usageCredits }) => {
  const navigate = useNavigate();
  const usagePercentage = (usageCredits.used / usageCredits.total) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex-shrink-0">
          <Avatar className="h-16 w-16 md:h-20 md:w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold">Welcome back, {user.name}!</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Usage this month</h3>
              <span className="text-xs text-muted-foreground">
                {usageCredits.used} / {usageCredits.total} credits
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
          <div className="pt-2 flex flex-wrap gap-3">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center">
              <BarChart className="mr-1 h-3 w-3" />
              {user.role === 'owner' ? 'Pro Plan' : user.role === 'admin' ? 'Team Plan' : 'Basic Plan'}
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-xs flex items-center">
              <span>{usageCredits.remaining} credits remaining</span>
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-xs flex items-center">
              <span>Renews in {usageCredits.daysUntilRenewal} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
