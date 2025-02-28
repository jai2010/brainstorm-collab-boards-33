
import React from 'react';
import { Link } from 'react-router-dom';
import { Topic, User } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Calendar } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  users: User[];
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, users }) => {
  // Calculate days since creation
  const daysSinceCreation = Math.floor((new Date().getTime() - new Date(topic.createdAt).getTime()) / (1000 * 3600 * 24));
  
  // Get owner and participants
  const owner = users.find(user => user.id === topic.ownerId);
  const participantUsers = topic.participants.map(p => users.find(u => u.id === p.userId)).filter(Boolean) as User[];
  
  // Current workflow stage display
  const stageLabels = {
    introduction: 'Introduction',
    submission: 'Submission',
    classification: 'Classification',
    review: 'Review',
    voting: 'Voting',
    finalization: 'Finalization'
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-border/40">
      <Link to={`/topic/${topic.id}`} className="block h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="mb-2 text-xs font-normal">
              {stageLabels[topic.workflow.currentStage]}
            </Badge>
            <div className="flex items-center text-muted-foreground text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {daysSinceCreation === 0 ? 'Today' : `${daysSinceCreation}d ago`}
            </div>
          </div>
          
          <h3 className="text-lg font-medium leading-tight mb-2">{topic.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{topic.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.categories.slice(0, 3).map(category => (
              <Badge 
                key={category.id} 
                className="text-xs font-normal" 
                style={{ backgroundColor: `${category.color}20`, color: category.color, borderColor: `${category.color}40` }}
              >
                {category.name}
              </Badge>
            ))}
            {topic.categories.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{topic.categories.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-border/40">
          {owner && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={owner.avatar} alt={owner.name} />
                <AvatarFallback>{owner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{owner.name}</span>
            </div>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Users className="h-3 w-3" />
                  <span>{participantUsers.length}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {participantUsers.slice(0, 5).map(user => (
                    <div key={user.id} className="flex items-center gap-2 py-1">
                      <div className={`h-2 w-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>{user.name}</span>
                    </div>
                  ))}
                  {participantUsers.length > 5 && (
                    <div className="text-muted-foreground text-center pt-1">
                      +{participantUsers.length - 5} more
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TopicCard;
