
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookTemplate, Users, Layout, Layers, Grid2X2, GitGraph, PlusCircle, LayoutGrid, LayoutList, Calendar, ChevronLeft, ChevronRight, Mail, Key, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useAppContext } from '@/context/AppContext';
import { IdeaCategory } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type BoardTemplate = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  categories: IdeaCategory[];
  layout?: string;
  customizable?: boolean;
};

const CreateBoard = () => {
  const navigate = useNavigate();
  const { addTopic } = useAppContext();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);
  
  // Step 1: Board Information
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState('10:00');
  
  // Step 2: Choose Template
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customCategories, setCustomCategories] = useState<IdeaCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#4F46E5');
  
  // Step 3: Invite Participants
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [generateAccessCode, setGenerateAccessCode] = useState(true);
  
  const templates: BoardTemplate[] = [
    {
      id: 'blank',
      name: 'Blank Board',
      description: 'Start from scratch with an empty board',
      icon: <Layout className="h-12 w-12 text-primary" />,
      categories: [
        { id: 'cat-default-1', name: 'General', color: '#4F46E5' }
      ],
      layout: 'blank',
      customizable: true
    },
    {
      id: 'brainstorm',
      name: 'Brainstorming Session',
      description: 'Collaborative idea generation',
      icon: <Layers className="h-12 w-12 text-primary" />,
      categories: [
        { id: 'cat-brain-1', name: 'Feature', color: '#4F46E5' },
        { id: 'cat-brain-2', name: 'Improvement', color: '#10B981' },
        { id: 'cat-brain-3', name: 'Problem', color: '#F59E0B' }
      ],
      layout: 'list',
      customizable: true
    },
    {
      id: 'swot',
      name: 'SWOT Analysis',
      description: 'Strengths, Weaknesses, Opportunities, Threats',
      icon: <Grid2X2 className="h-12 w-12 text-primary" />,
      categories: [
        { id: 'cat-swot-1', name: 'Strength', color: '#10B981' },
        { id: 'cat-swot-2', name: 'Weakness', color: '#F59E0B' },
        { id: 'cat-swot-3', name: 'Opportunity', color: '#3B82F6' },
        { id: 'cat-swot-4', name: 'Threat', color: '#EF4444' }
      ],
      layout: 'grid-2x2',
      customizable: false
    },
    {
      id: 'retroboard',
      name: 'Agile Retro Matrix',
      description: 'What went well, what needs improvement, action items',
      icon: <GitGraph className="h-12 w-12 text-primary" />,
      categories: [
        { id: 'cat-retro-1', name: 'What Went Well', color: '#10B981' },
        { id: 'cat-retro-2', name: 'What Needs Improvement', color: '#F59E0B' },
        { id: 'cat-retro-3', name: 'Action Items', color: '#3B82F6' }
      ],
      layout: 'columns-3',
      customizable: false
    },
    {
      id: 'impact',
      name: 'Impact/Effort Matrix',
      description: 'Prioritize ideas based on impact and effort',
      icon: <LayoutGrid className="h-12 w-12 text-primary" />,
      categories: [
        { id: 'cat-impact-1', name: 'High Impact, Low Effort', color: '#10B981' },
        { id: 'cat-impact-2', name: 'High Impact, High Effort', color: '#3B82F6' },
        { id: 'cat-impact-3', name: 'Low Impact, Low Effort', color: '#F59E0B' },
        { id: 'cat-impact-4', name: 'Low Impact, High Effort', color: '#EF4444' }
      ],
      layout: 'grid-2x2',
      customizable: false
    }
  ];

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: IdeaCategory = {
      id: `custom-cat-${Date.now()}`,
      name: newCategoryName.trim(),
      color: newCategoryColor
    };
    
    setCustomCategories([...customCategories, newCategory]);
    setNewCategoryName('');
  };
  
  const removeCategory = (id: string) => {
    setCustomCategories(customCategories.filter(cat => cat.id !== id));
  };
  
  const addEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail.trim() || !emailRegex.test(newEmail) || inviteEmails.includes(newEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setInviteEmails([...inviteEmails, newEmail.trim()]);
    setNewEmail('');
  };
  
  const removeEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };
  
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!boardName.trim()) {
        toast.error('Please provide a name for your board');
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedTemplate) {
        toast.error('Please select a template');
        return;
      }
      
      // For customizable templates, ensure at least one category
      const template = templates.find(t => t.id === selectedTemplate);
      if (template?.customizable && customCategories.length === 0) {
        toast.error('Please add at least one category');
        return;
      }
    }
    
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setProgress(nextStep * 25);
  };
  
  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    if (prevStep < 1) return;
    
    setCurrentStep(prevStep);
    setProgress(prevStep * 25);
  };
  
  const createAccessCode = () => {
    // Generate a 6-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  
  const handleCreateBoard = () => {
    if (!boardName.trim() || !selectedTemplate) {
      toast.error('Please complete all required fields');
      return;
    }
    
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    if (!selectedTemplateData) return;
    
    // Combine date and time for scheduling
    let scheduledDateTime = undefined;
    if (scheduledDate) {
      const [hours, minutes] = scheduledTime.split(':').map(Number);
      scheduledDateTime = new Date(scheduledDate);
      scheduledDateTime.setHours(hours, minutes);
    }
    
    // Use custom categories if available, otherwise use template defaults
    const finalCategories = selectedTemplateData.customizable && customCategories.length > 0 
      ? customCategories 
      : selectedTemplateData.categories;
    
    // Create the new topic
    addTopic({
      title: boardName,
      description: boardDescription,
      scheduledDate: scheduledDateTime,
      categories: finalCategories,
      admins: [], // Will be populated in context
      participants: [], // Will be populated in context
      invitedEmails: inviteEmails.length > 0 ? inviteEmails : undefined,
      accessCode: generateAccessCode ? createAccessCode() : undefined,
      workflow: {
        currentStage: "submission",
        stageEndDate: new Date(Date.now() + 86400000 * 7) // 7 days from now
      },
      layout: selectedTemplateData.layout
    });

    // Notify success
    toast.success('Board created successfully!');
    
    // Navigate to dashboard (in a real app, we'd navigate to the new board)
    navigate('/dashboard');
  };
  
  // Get current template
  const currentTemplate = selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null;
  
  // Categories to display (either from template or custom)
  const displayCategories = (currentTemplate?.customizable && customCategories.length > 0) 
    ? customCategories 
    : (currentTemplate?.categories || []);

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Create New Board</h1>
        <p className="text-muted-foreground">Create a new brainstorming board for your team</p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Board Info</span>
          <span>Template</span>
          <span>Participants</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step 1: Board Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Board Information</CardTitle>
            <CardDescription>
              Enter the basic details for your new board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="boardName">Board Name *</Label>
              <Input
                id="boardName"
                placeholder="My Awesome Board"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="What is this board for?"
                value={boardDescription}
                onChange={(e) => setBoardDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Schedule Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !scheduledDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Schedule Time (Optional)</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  disabled={!scheduledDate}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button onClick={handleNextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Choose a Template */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose a Template</CardTitle>
            <CardDescription>
              Select a template for your new board or start from scratch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    // Reset custom categories when template changes
                    setCustomCategories([]);
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    {template.icon}
                    <h3 className="font-medium mt-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Template Preview */}
            {currentTemplate && (
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Template Preview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentTemplate.customizable 
                      ? "This template allows custom categories. Add or edit categories below." 
                      : "This template has predefined categories that cannot be modified."}
                  </p>
                </div>
                
                {/* Categories */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {displayCategories.map((category) => (
                      <Badge 
                        key={category.id} 
                        className="text-xs font-normal flex items-center gap-1 px-3 py-1" 
                        style={{ 
                          backgroundColor: `${category.color}20`, 
                          color: category.color, 
                          borderColor: `${category.color}40` 
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full mr-1"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                        {currentTemplate.customizable && (
                          <button
                            type="button"
                            className="ml-1 hover:text-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCategory(category.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Add custom category */}
                  {currentTemplate.customizable && (
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="categoryName">New Category Name</Label>
                        <Input
                          id="categoryName"
                          placeholder="Enter category name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="categoryColor">Color</Label>
                        <Input
                          id="categoryColor"
                          type="color"
                          value={newCategoryColor}
                          onChange={(e) => setNewCategoryColor(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                      </div>
                      <Button type="button" onClick={addCategory}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Board Layout Preview */}
                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-md font-medium mb-3">Layout Preview</h3>
                  {currentTemplate.layout === 'blank' || currentTemplate.layout === 'list' ? (
                    <div className="border aspect-video rounded-lg flex items-center justify-center bg-white">
                      <p className="text-muted-foreground text-sm">Single column list view</p>
                    </div>
                  ) : currentTemplate.layout === 'grid-2x2' ? (
                    <div className="border aspect-video rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-white">
                      {displayCategories.slice(0, 4).map((cat, idx) => (
                        <div 
                          key={idx} 
                          className="border rounded p-2 flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}10` }}
                        >
                          <p className="text-xs text-center font-medium" style={{ color: cat.color }}>{cat.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : currentTemplate.layout === 'columns-3' ? (
                    <div className="border aspect-video rounded-lg grid grid-cols-3 gap-2 p-2 bg-white">
                      {displayCategories.slice(0, 3).map((cat, idx) => (
                        <div 
                          key={idx} 
                          className="border rounded p-2 flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}10` }}
                        >
                          <p className="text-xs text-center font-medium" style={{ color: cat.color }}>{cat.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border aspect-video rounded-lg flex items-center justify-center bg-white">
                      <p className="text-muted-foreground text-sm">Custom layout</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Invite Participants */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Invite Participants</CardTitle>
            <CardDescription>
              Add team members to your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emails">Invite by Email</Label>
                <div className="flex gap-2">
                  <Input
                    id="emails"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                  />
                  <Button type="button" onClick={addEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Press Enter to add multiple emails</p>
              </div>
              
              {/* Email List */}
              {inviteEmails.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Invited Participants</h3>
                  <div className="flex flex-wrap gap-2">
                    {inviteEmails.map((email, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        {email}
                        <button
                          type="button"
                          className="ml-1 hover:text-foreground"
                          onClick={() => removeEmail(email)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="accessCode">Generate Access Code</Label>
                  <input
                    type="checkbox"
                    id="accessCode"
                    checked={generateAccessCode}
                    onChange={(e) => setGenerateAccessCode(e.target.checked)}
                    className="ml-2"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  An access code allows participants to join without login
                </p>
                
                {generateAccessCode && (
                  <div className="flex items-center p-2 bg-primary/5 border rounded-md mt-2">
                    <Key className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">
                      A unique access code will be generated when the board is created
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Review and Create */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review and Create</CardTitle>
            <CardDescription>
              Review your board settings before creation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Board Information Summary */}
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-lg mb-3">Board Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{boardName}</span>
                  </div>
                  {boardDescription && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Description:</span>
                      <span>{boardDescription}</span>
                    </div>
                  )}
                  {scheduledDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scheduled for:</span>
                      <span>{format(scheduledDate, "PPP")} at {scheduledTime}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Template Summary */}
              {currentTemplate && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-3">Template</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="font-medium">{currentTemplate.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Layout:</span>
                      <span>{currentTemplate.layout === 'blank' ? 'List View' :
                            currentTemplate.layout === 'grid-2x2' ? 'Four Quadrants' :
                            currentTemplate.layout === 'columns-3' ? 'Three Columns' : 
                            'Custom'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Categories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {displayCategories.map((category) => (
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
                  </div>
                </div>
              )}
              
              {/* Participants Summary */}
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-lg mb-3">Participants</h3>
                <div className="space-y-2">
                  {inviteEmails.length > 0 ? (
                    <div>
                      <span className="text-muted-foreground">Invited emails:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {inviteEmails.map((email, index) => (
                          <Badge key={index} variant="secondary" className="text-xs font-normal">
                            <Mail className="h-3 w-3 mr-1" />
                            {email}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invited participants:</span>
                      <span>None</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Access code:</span>
                    <span>{generateAccessCode ? 'Will be generated' : 'None'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleCreateBoard}>
              <Check className="mr-2 h-4 w-4" />
              Create Board
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CreateBoard;
