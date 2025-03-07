
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, MessageCircle, ThumbsUp, UserPlus, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Idea = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  votes: number;
  comments: number;
  createdAt: string;
};

const ViewBoard = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [newIdea, setNewIdea] = useState('');
  
  // Mock board data
  const board = {
    id: boardId || '1',
    name: 'Product Brainstorming Session',
    description: 'Ideas for our next product release',
    createdAt: '2023-09-15T10:30:00Z',
    participants: [
      { id: '1', name: 'Alex Johnson', avatar: '/placeholder.svg', initials: 'AJ' },
      { id: '2', name: 'Sarah Chen', avatar: '/placeholder.svg', initials: 'SC' },
      { id: '3', name: 'Miguel Diaz', avatar: '/placeholder.svg', initials: 'MD' },
    ],
  };
  
  // Mock ideas data
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      content: 'Add a dark mode option to improve accessibility and reduce eye strain',
      author: { name: 'Alex Johnson', avatar: '/placeholder.svg', initials: 'AJ' },
      votes: 12,
      comments: 3,
      createdAt: '2023-09-15T11:30:00Z',
    },
    {
      id: '2',
      content: 'Implement a notification system for important updates',
      author: { name: 'Sarah Chen', avatar: '/placeholder.svg', initials: 'SC' },
      votes: 8,
      comments: 5,
      createdAt: '2023-09-15T12:15:00Z',
    },
    {
      id: '3',
      content: 'Create a mobile app version for on-the-go access',
      author: { name: 'Miguel Diaz', avatar: '/placeholder.svg', initials: 'MD' },
      votes: 15,
      comments: 7,
      createdAt: '2023-09-15T13:00:00Z',
    },
  ]);

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIdea.trim()) {
      toast.error('Please enter an idea');
      return;
    }

    const idea: Idea = {
      id: Date.now().toString(),
      content: newIdea,
      author: { name: 'You', initials: 'YO' },
      votes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    setIdeas([idea, ...ideas]);
    setNewIdea('');
    toast.success('Idea added successfully!');
  };

  const handleVote = (ideaId: string) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">{board.name}</h1>
          <p className="text-muted-foreground">{board.description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => toast.success('Invitation link copied to clipboard!')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Board Settings</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Board</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">Participants:</span>
        <div className="flex -space-x-2">
          {board.participants.map((participant) => (
            <Avatar key={participant.id} className="border-2 border-background h-8 w-8">
              <AvatarImage src={participant.avatar} alt={participant.name} />
              <AvatarFallback>{participant.initials}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="border-2 border-background bg-primary h-8 w-8">
            <AvatarFallback>+</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mb-8">
        <form onSubmit={handleAddIdea} className="flex gap-3">
          <Input
            placeholder="Add your idea..."
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Idea
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={idea.author.avatar} />
                    <AvatarFallback>{idea.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{idea.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{idea.content}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleVote(idea.id)}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" /> {idea.votes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle className="mr-1 h-4 w-4" /> {idea.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewBoard;
