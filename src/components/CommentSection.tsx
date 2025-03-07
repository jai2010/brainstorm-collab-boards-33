
import React, { useState } from 'react';
import { useTopicContext } from '@/context/TopicContext';
import { Comment, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MessageSquare, Send, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  ideaId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ ideaId }) => {
  const { comments, users, addComment, currentUser } = useTopicContext();
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  
  // Filter comments for this idea
  const ideaComments = comments.filter(comment => comment.ideaId === ideaId);
  
  // Organize into threads (top-level and replies)
  const topLevelComments = ideaComments.filter(comment => !comment.parentId);
  const replies = ideaComments.filter(comment => !!comment.parentId);
  
  const handleSubmitComment = () => {
    if (!commentText.trim() || !currentUser) return;
    
    addComment({
      ideaId,
      authorId: currentUser.id,
      content: commentText.trim(),
      parentId: replyTo
    });
    
    setCommentText('');
    setReplyTo(null);
  };
  
  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };
  
  // Format date to relative time
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  // Get user data from user ID
  const getUser = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };
  
  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const author = getUser(comment.authorId);
    const commentReplies = replies.filter(reply => reply.parentId === comment.id);
    
    return (
      <div key={comment.id} className={`${isReply ? 'ml-12' : ''} mb-4`}>
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            {author?.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
            <AvatarFallback>{author?.name.substring(0, 2).toUpperCase() || '??'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm">{author?.name || 'Unknown user'}</span>
                <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 mt-1 text-xs text-muted-foreground"
              onClick={() => handleReply(comment.id)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            
            {/* Render replies */}
            {commentReplies.map(reply => renderComment(reply, true))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="font-medium">Comments ({ideaComments.length})</h3>
      </div>
      
      {/* Comment form */}
      <div className="flex gap-3 mb-6">
        <Avatar className="h-8 w-8">
          {currentUser?.avatar && <AvatarImage src={currentUser.avatar} alt={currentUser.name} />}
          <AvatarFallback>{currentUser?.name.substring(0, 2).toUpperCase() || '??'}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-2 min-h-[80px]"
          />
          
          {replyTo && (
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Replying to a comment</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 px-2 text-xs"
                onClick={() => setReplyTo(null)}
              >
                Cancel
              </Button>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              size="sm" 
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || !currentUser}
            >
              <Send className="h-4 w-4 mr-1" />
              Submit
            </Button>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-4">
        {topLevelComments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No comments yet. Be the first to comment!</p>
        ) : (
          topLevelComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
