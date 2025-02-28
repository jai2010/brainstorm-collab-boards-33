
import React, { useState } from 'react';
import { Idea, IdeaCategory, User, Comment } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useTopicContext } from '@/context/TopicContext';
import ParticipantBadge from './ParticipantBadge';

interface IdeaTableProps {
  ideas: Idea[];
  categories: IdeaCategory[];
  users: User[];
  comments: Comment[];
}

type SortField = 'title' | 'author' | 'category' | 'votes' | 'comments' | 'date';
type SortDirection = 'asc' | 'desc';

const IdeaTable: React.FC<IdeaTableProps> = ({ ideas, categories, users, comments }) => {
  const { voteIdea, currentUser } = useTopicContext();
  
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };
  
  // Get comment counts for each idea
  const getCommentCount = (ideaId: string) => {
    return comments.filter(comment => comment.ideaId === ideaId).length;
  };
  
  // Get author for each idea
  const getAuthor = (authorId: string) => {
    return users.find(user => user.id === authorId);
  };
  
  // Get category for each idea
  const getCategory = (categoryId: string) => {
    return categories.find(category => category.id === categoryId);
  };
  
  // Sort ideas
  const sortedIdeas = [...ideas].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'title':
        return direction * a.title.localeCompare(b.title);
      case 'author': {
        const authorA = getAuthor(a.authorId)?.name || '';
        const authorB = getAuthor(b.authorId)?.name || '';
        return direction * authorA.localeCompare(authorB);
      }
      case 'category': {
        const categoryA = getCategory(a.categoryId)?.name || '';
        const categoryB = getCategory(b.categoryId)?.name || '';
        return direction * categoryA.localeCompare(categoryB);
      }
      case 'votes':
        return direction * (a.votes.length - b.votes.length);
      case 'comments':
        return direction * (getCommentCount(a.id) - getCommentCount(b.id));
      case 'date':
      default:
        return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  });
  
  const handleVote = (ideaId: string) => {
    if (currentUser) {
      voteIdea(ideaId, currentUser.id);
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] cursor-pointer" onClick={() => handleSort('title')}>
              <div className="flex items-center gap-1">
                <span>Idea</span>
                {getSortIcon('title')}
              </div>
            </TableHead>
            <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort('author')}>
              <div className="flex items-center gap-1">
                <span>Author</span>
                {getSortIcon('author')}
              </div>
            </TableHead>
            <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort('category')}>
              <div className="flex items-center gap-1">
                <span>Category</span>
                {getSortIcon('category')}
              </div>
            </TableHead>
            <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('votes')}>
              <div className="flex items-center gap-1">
                <span>Votes</span>
                {getSortIcon('votes')}
              </div>
            </TableHead>
            <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('comments')}>
              <div className="flex items-center gap-1">
                <span>Comments</span>
                {getSortIcon('comments')}
              </div>
            </TableHead>
            <TableHead className="w-[150px] text-right cursor-pointer" onClick={() => handleSort('date')}>
              <div className="flex items-center justify-end gap-1">
                <span>Date</span>
                {getSortIcon('date')}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIdeas.map((idea) => {
            const author = getAuthor(idea.authorId);
            const category = getCategory(idea.categoryId);
            const commentCount = getCommentCount(idea.id);
            const hasVoted = currentUser ? idea.votes.includes(currentUser.id) : false;
            
            return (
              <TableRow key={idea.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{idea.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{idea.content}</div>
                    {idea.customTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {idea.customTags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {author && <ParticipantBadge user={author} showName />}
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-8 px-2 ${hasVoted ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => handleVote(idea.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{idea.votes.length}</span>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{commentCount}</span>
                  </Button>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDate(idea.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
          
          {sortedIdeas.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No ideas found. Be the first to add an idea!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IdeaTable;
