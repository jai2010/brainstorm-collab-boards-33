
import React from 'react';
import { Idea, User, IdeaCategory } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useTopicContext } from '@/context/TopicContext';
import ParticipantBadge from './ParticipantBadge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface IdeaCardProps {
  idea: Idea;
  category?: IdeaCategory;
  author?: User;
  commentCount?: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, category, author, commentCount = 0 }) => {
  const { voteIdea, currentUser, users } = useTopicContext();
  
  const hasVoted = currentUser ? idea.votes.includes(currentUser.id) : false;
  
  const handleVote = () => {
    if (currentUser) {
      voteIdea(idea.id, currentUser.id);
    }
  };
  
  // Calculate relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };
  
  // Get voters
  const voters = idea.votes.map(id => users.find(user => user.id === id)).filter(Boolean) as User[];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm border border-border/40">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          {category && (
            <Badge 
              className="text-xs font-normal" 
              style={{ 
                backgroundColor: `${category.color}20`, 
                color: category.color, 
                borderColor: `${category.color}40` 
              }}
            >
              {category.name}
            </Badge>
          )}
          
          <div className="text-xs text-muted-foreground">
            {getRelativeTime(idea.createdAt)}
          </div>
        </div>
        
        <h3 className="text-base font-medium mb-2">{idea.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{idea.content}</p>
        
        {idea.customTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.customTags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-border/10">
        <div className="flex items-center">
          {author && <ParticipantBadge user={author} />}
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 px-2 ${hasVoted ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={handleVote}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{idea.votes.length}</span>
                </Button>
              </TooltipTrigger>
              {voters.length > 0 && (
                <TooltipContent>
                  <div className="text-xs">
                    <div className="font-medium mb-1">Votes</div>
                    {voters.slice(0, 5).map(user => (
                      <div key={user.id} className="flex items-center gap-2 py-0.5">
                        <div className={`h-2 w-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>{user.name}</span>
                      </div>
                    ))}
                    {voters.length > 5 && (
                      <div className="text-muted-foreground text-center pt-1">
                        +{voters.length - 5} more
                      </div>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{commentCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
