
import React from 'react';
import { Idea, IdeaCategory, User } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, ArrowLeft, ChevronLeft, Share2, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTopicContext } from '@/context/TopicContext';
import ParticipantBadge from './ParticipantBadge';
import CommentSection from './CommentSection';
import { Separator } from '@/components/ui/separator';

interface IdeaDetailsProps {
  idea: Idea;
  category?: IdeaCategory;
  author?: User;
  onClose: () => void;
}

const IdeaDetails: React.FC<IdeaDetailsProps> = ({ idea, category, author, onClose }) => {
  const { voteIdea, currentUser, comments } = useTopicContext();
  
  const hasVoted = currentUser ? idea.votes.includes(currentUser.id) : false;
  const commentCount = comments.filter(c => c.ideaId === idea.id).length;
  
  const handleVote = () => {
    if (currentUser) {
      voteIdea(idea.id, currentUser.id);
    }
  };
  
  // Calculate relative time
  const getRelativeTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={onClose} className="px-0 py-0 h-auto">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back to ideas</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
        </div>
        
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
        
        <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
        <p className="text-muted-foreground mb-4">{idea.content}</p>
        
        {idea.customTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.customTags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {author && <ParticipantBadge user={author} />}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={hasVoted ? "default" : "outline"} 
              size="sm" 
              className="h-8 gap-1"
              onClick={handleVote}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{idea.votes.length} {idea.votes.length === 1 ? 'vote' : 'votes'}</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
            </Button>
          </div>
        </div>
        
        <Separator />
      </CardHeader>
      
      <CardContent className="pt-6">
        <CommentSection ideaId={idea.id} />
      </CardContent>
    </Card>
  );
};

export default IdeaDetails;
