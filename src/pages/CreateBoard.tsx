
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookTemplate, Users, Layout, Layers, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

type BoardTemplate = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

const CreateBoard = () => {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: BoardTemplate[] = [
    {
      id: 'blank',
      name: 'Blank Board',
      description: 'Start from scratch with an empty board',
      icon: <Layout className="h-12 w-12 text-primary" />,
    },
    {
      id: 'brainstorm',
      name: 'Brainstorming Session',
      description: 'Collaborative idea generation',
      icon: <Layers className="h-12 w-12 text-primary" />,
    },
    {
      id: 'teamplanning',
      name: 'Team Planning',
      description: 'Organize tasks and projects with your team',
      icon: <Users className="h-12 w-12 text-primary" />,
    },
  ];

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!boardName.trim()) {
      toast.error('Please provide a name for your board');
      return;
    }
    
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }

    // In a real app, we would save this to a database
    const newBoard = {
      id: Date.now().toString(),
      name: boardName,
      description: boardDescription,
      template: selectedTemplate,
      createdAt: new Date().toISOString(),
    };

    // For now, we'll simulate a successful creation
    toast.success('Board created successfully!');
    
    // Navigate to the new board (in a real app, we'd use the actual board ID)
    navigate('/boards/1');
  };

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Board</h1>
        <p className="text-muted-foreground">Create a new brainstorming board for your team</p>
      </div>

      <form onSubmit={handleCreateBoard}>
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Board Information</CardTitle>
              <CardDescription>
                Enter the basic details for your new board
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="boardName">Board Name</Label>
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
                <Input
                  id="description"
                  placeholder="What is this board for?"
                  value={boardDescription}
                  onChange={(e) => setBoardDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a template for your new board or start from scratch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
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
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" variant="outline" className="mr-2" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Board
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;
