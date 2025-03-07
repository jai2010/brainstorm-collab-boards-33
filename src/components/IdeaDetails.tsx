
import React, { useState } from 'react';
import { Idea, IdeaCategory, User } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, ArrowLeft, ChevronLeft, Share2, Flag, Calendar, Clock, Edit, Trash2, Copy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTopicContext } from '@/context/TopicContext';
import ParticipantBadge from './ParticipantBadge';
import CommentSection from './CommentSection';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IdeaDetailsProps {
  idea: Idea;
  category?: IdeaCategory;
  author?: User;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const IdeaDetails: React.FC<IdeaDetailsProps> = ({ 
  idea, 
  category, 
  author, 
  onClose,
  onEdit,
  onDelete
}) => {
  const { voteIdea, currentUser, comments } = useTopicContext();
  const [showFullContent, setShowFullContent] = useState(false);
  
  const hasVoted = currentUser ? idea.votes.includes(currentUser.id) : false;
  const commentCount = comments.filter(c => c.ideaId === idea.id).length;
  const isAuthor = currentUser?.id === idea.authorId;
  
  const handleVote = () => {
    if (currentUser) {
      voteIdea(idea.id, currentUser.id);
    }
  };
  
  const handleCopyLink = () => {
    // In a real app, we would get a unique link to this idea
    const fakeLink = `https://app.ideasboard.com/ideas/${idea.id}`;
    navigator.clipboard.writeText(fakeLink);
    toast.success("Link copied to clipboard");
  };
  
  const handleReport = () => {
    toast.success("Report submitted. We'll review this content.");
  };
  
  // Format relative time
  const getRelativeTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  const getFormattedDate = (date: Date) => {
    return format(new Date(date), "PPP");
  };
  
  // Handle content truncation
  const shouldTruncate = idea.content.length > 200;
  const truncatedContent = shouldTruncate && !showFullContent 
    ? `${idea.content.slice(0, 200)}...` 
    : idea.content;
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="pb-0 space-y-4">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="px-0 py-0 h-auto">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back to ideas</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopyLink}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReport}>
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
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {getFormattedDate(idea.createdAt)}
            </div>
            <Separator orientation="vertical" className="h-3" />
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {getRelativeTime(idea.createdAt)}
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
        <div>
          <p className="text-muted-foreground mb-2">{truncatedContent}</p>
          {shouldTruncate && (
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>
        
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
            {isAuthor && (
              <>
                {onEdit && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-1"
                    onClick={onEdit}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden md:inline">Edit</span>
                  </Button>
                )}
                
                {onDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden md:inline">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Idea</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this idea? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete} className="bg-destructive">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            )}
            
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
