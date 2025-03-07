
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, Clock, BarChart4, Filter, Grid3X3, List, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, Plus, PlusCircle, Search, SlidersHorizontal, ArrowDownUp, ChartBar, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/AppContext';
import { TopicProvider } from '@/context/TopicContext';
import NewIdeaForm from '@/components/NewIdeaForm';
import IdeaCard from '@/components/IdeaCard';
import IdeaDetails from '@/components/IdeaDetails';
import TemplateLayout from '@/components/TemplateLayout';
import BoardSummary from '@/components/BoardSummary';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Idea, IdeaCategory, User } from '@/types';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

const ViewBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { topics, users, ideas, addIdea } = useAppContext();
  
  const [viewType, setViewType] = useState<'card' | 'table'>('card');
  const [activeTab, setActiveTab] = useState<'ideas' | 'summary'>('ideas');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isIdeaDialogOpen, setIsIdeaDialogOpen] = useState(false);
  const [isNewIdeaDialogOpen, setIsNewIdeaDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'votes' | 'comments'>('newest');
  
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
  let topicIdeas = ideas.filter(idea => idea.topicId === topic.id);
  
  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    topicIdeas = topicIdeas.filter(idea => 
      idea.title.toLowerCase().includes(query) || 
      idea.content.toLowerCase().includes(query) ||
      idea.customTags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Apply category filter
  if (filterCategory) {
    topicIdeas = topicIdeas.filter(idea => idea.categoryId === filterCategory);
  }
  
  // Apply sorting
  topicIdeas = [...topicIdeas].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === 'votes') {
      return b.votes.length - a.votes.length;
    } else {
      // Sort by comments would go here if we had a comment count per idea
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Handle successful idea submission
  const handleIdeaSubmitSuccess = () => {
    toast.success("Your idea was submitted successfully!");
    setIsNewIdeaDialogOpen(false);
  };
  
  // Handle idea selection
  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsIdeaDialogOpen(true);
  };
  
  // Copy access code to clipboard
  const copyAccessCode = () => {
    if (topic.accessCode) {
      navigator.clipboard.writeText(topic.accessCode);
      toast.success("Access code copied to clipboard");
    }
  };
  
  // Helper method to get category from categoryId
  const getCategoryById = (categoryId: string): IdeaCategory | undefined => {
    return topic.categories.find(cat => cat.id === categoryId);
  };
  
  // Helper method to get idea author
  const getAuthorById = (authorId: string): User | undefined => {
    return users.find(user => user.id === authorId);
  };
  
  return (
    <TopicProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="border-b bg-white sticky top-0 z-10">
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Invite
                    <ChevronDown className="ml-2 h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center cursor-pointer"
                      onClick={() => {
                        // Would open invite modal in a full implementation
                        toast.info("Invite feature would open here");
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Invite by email</span>
                    </DropdownMenuItem>
                    
                    {topic.accessCode && (
                      <DropdownMenuItem className="flex items-center cursor-pointer"
                        onClick={copyAccessCode}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy access code: {topic.accessCode}</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem className="flex items-center cursor-pointer"
                      onClick={() => {
                        // Would copy share link in a full implementation
                        toast.info("Share link feature would open here");
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Share link</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenu>
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
                    {topic.scheduledDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-muted-foreground">Scheduled for</p>
                          <p className="font-medium">
                            {format(new Date(topic.scheduledDate), "PPP")}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Current stage ends in</p>
                        <p className="font-medium">
                          {topic.workflow.stageEndDate ? 
                            format(new Date(topic.workflow.stageEndDate), "PPP") : 
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
            
            {/* Tabs for Ideas and Summary */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ideas' | 'summary')} className="mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="ideas" className="gap-2">
                    <Grid3X3 className="h-4 w-4" />
                    Ideas
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="gap-2">
                    <ChartBar className="h-4 w-4" />
                    Summary
                  </TabsTrigger>
                </TabsList>
                
                {activeTab === 'ideas' && (
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    {/* Search */}
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search ideas..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Category Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          {filterCategory 
                            ? getCategoryById(filterCategory)?.name || 'Category' 
                            : 'Category'}
                          <ChevronDown className="ml-2 h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => setFilterCategory(null)}
                        >
                          All Categories
                        </DropdownMenuItem>
                        
                        {topic.categories.map((category) => (
                          <DropdownMenuItem 
                            key={category.id} 
                            className="cursor-pointer"
                            onClick={() => setFilterCategory(category.id)}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span>{category.name}</span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Sort Order */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowDownUp className="h-4 w-4 mr-2" />
                          Sort
                          <ChevronDown className="ml-2 h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => setSortOrder('newest')}
                        >
                          Newest first
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => setSortOrder('oldest')}
                        >
                          Oldest first
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => setSortOrder('votes')}
                        >
                          Most votes
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => setSortOrder('comments')}
                        >
                          Most comments
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* View Mode Toggle */}
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
                )}
              </div>
              
              <TabsContent value="ideas" className="mt-0">
                {/* New Idea Button (Floating) */}
                <div className="fixed bottom-6 right-6 z-10">
                  <Dialog open={isNewIdeaDialogOpen} onOpenChange={setIsNewIdeaDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
                        <PlusCircle className="h-6 w-6" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Idea</DialogTitle>
                        <DialogDescription>
                          Share your idea with the team. Be clear and concise.
                        </DialogDescription>
                      </DialogHeader>
                      <NewIdeaForm topic={topic} onSuccess={handleIdeaSubmitSuccess} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Ideas List */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Ideas ({topicIdeas.length})</h2>
                    
                    {/* Mobile New Idea Button */}
                    <Dialog open={isNewIdeaDialogOpen} onOpenChange={setIsNewIdeaDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="md:hidden" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          New Idea
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                  
                  {topicIdeas.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground mb-4">No ideas have been submitted yet.</p>
                        <Dialog open={isNewIdeaDialogOpen} onOpenChange={setIsNewIdeaDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />
                              Add the first idea
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ) : (
                    <TemplateLayout
                      layout={topic.layout}
                      categories={topic.categories}
                      ideas={topicIdeas}
                      users={users}
                      onIdeaClick={handleIdeaClick}
                    />
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="summary" className="mt-0">
                <BoardSummary 
                  ideas={topicIdeas}
                  categories={topic.categories}
                  users={users}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Idea Detail Dialog */}
        <Dialog open={isIdeaDialogOpen} onOpenChange={setIsIdeaDialogOpen}>
          <DialogContent className="sm:max-w-[700px] p-0 max-h-[90vh] overflow-y-auto">
            {selectedIdea && (
              <IdeaDetails
                idea={selectedIdea}
                category={topic.categories.find(cat => cat.id === selectedIdea.categoryId)}
                author={users.find(user => user.id === selectedIdea.authorId)}
                onClose={() => setIsIdeaDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TopicProvider>
  );
};

export default ViewBoard;
