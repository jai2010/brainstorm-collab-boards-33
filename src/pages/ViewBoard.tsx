
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Clock, BarChart4, Filter, Grid3X3, List, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/AppContext';
import NewIdeaForm from '@/components/NewIdeaForm';
import TopicCard from '@/components/TopicCard';
import IdeaCard from '@/components/IdeaCard';

const ViewBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { topics, users, ideas } = useAppContext();
  
  const [viewType, setViewType] = useState<'card' | 'table'>('card');
  
  // Find the current topic
  const topic = topics.find(t => t.id === boardId);
  
  if (!topic) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Board Not Found</h1>
        <p className="mb-8">The board you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }
  
  // Find the topic owner
  const owner = users.find(user => user.id === topic.ownerId);
  
  // Get the current workflow stage
  const currentStage = topic.workflow.currentStage;
  const stageLabels: Record<string, string> = {
    introduction: 'Introduction',
    submission: 'Submission',
    classification: 'Classification',
    review: 'Review',
    voting: 'Voting',
    finalization: 'Finalization'
  };
  
  // Filter ideas for this topic
  const topicIdeas = ideas.filter(idea => idea.topicId === topic.id);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="border-b bg-white">
        <div className="container flex items-center h-16 justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-semibold truncate">{topic.title}</h1>
            <Badge variant="outline" className="ml-2">
              {stageLabels[currentStage]}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {topic.participants.slice(0, 3).map((participant, index) => {
                const user = users.find(u => u.id === participant.userId);
                if (!user) return null;
                
                return (
                  <Avatar key={index} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                );
              })}
              
              {topic.participants.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +{topic.participants.length - 3}
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow bg-muted/20 overflow-y-auto">
        <div className="container py-6">
          {/* Topic Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
                  <p className="text-muted-foreground mb-4">{topic.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {topic.categories.map(category => (
                      <Badge 
                        key={category.id} 
                        className="text-xs font-normal" 
                        style={{ 
                          backgroundColor: `${category.color}20`, 
                          color: category.color, 
                          borderColor: `${category.color}40` 
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Current stage ends in</p>
                      <p className="font-medium">
                        {topic.workflow.stageEndDate ? 
                          new Date(topic.workflow.stageEndDate).toLocaleDateString() : 
                          'Not set'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-medium">{topic.participants.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Ideas submitted</p>
                      <p className="font-medium">{topicIdeas.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Idea Submission Section */}
          {currentStage === 'submission' && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Submit Your Idea</h2>
              <NewIdeaForm topic={topic} />
            </div>
          )}
          
          {/* Ideas List */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Ideas ({topicIdeas.length})</h2>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                
                <div className="flex border rounded-md overflow-hidden">
                  <Button 
                    variant={viewType === 'card' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-none h-9 px-3"
                    onClick={() => setViewType('card')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" />
                  <Button 
                    variant={viewType === 'table' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-none h-9 px-3"
                    onClick={() => setViewType('table')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {topicIdeas.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No ideas have been submitted yet.</p>
                  {currentStage === 'submission' && (
                    <p>Be the first to submit an idea!</p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topicIdeas.map(idea => {
                  const category = topic.categories.find(cat => cat.id === idea.categoryId);
                  const author = users.find(user => user.id === idea.authorId);
                  
                  return (
                    <IdeaCard 
                      key={idea.id} 
                      idea={idea} 
                      category={category} 
                      author={author}
                      commentCount={0}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBoard;
