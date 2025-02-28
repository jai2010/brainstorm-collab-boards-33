
import React, { useState } from 'react';
import { useTopicContext } from '@/context/TopicContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewTopicModalProps {
  open: boolean;
  onClose: () => void;
}

const NewTopicModal: React.FC<NewTopicModalProps> = ({ open, onClose }) => {
  const { addTopic, currentUser } = useTopicContext();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [categories, setCategories] = useState<{ name: string; color: string }[]>([
    { name: 'Feature', color: '#4CAF50' },
    { name: 'Improvement', color: '#2196F3' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  
  const colorOptions = [
    '#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#E91E63', 
    '#673AB7', '#FF9800', '#607D8B', '#795548', '#009688'
  ];
  
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  
  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { name: newCategory.trim(), color: selectedColor }]);
      setNewCategory('');
      // Cycle to next color
      const nextColorIndex = (colorOptions.indexOf(selectedColor) + 1) % colorOptions.length;
      setSelectedColor(colorOptions[nextColorIndex]);
    }
  };
  
  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a topic title',
        variant: 'destructive',
      });
      return;
    }
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a topic',
        variant: 'destructive',
      });
      return;
    }
    
    // Create the new topic
    addTopic({
      title: title.trim(),
      description: description.trim(),
      ownerId: currentUser.id,
      accessCode: accessCode.trim() || undefined,
      categories: categories.map((cat, index) => ({
        id: (index + 1).toString(),
        name: cat.name,
        color: cat.color,
      })),
      admins: [currentUser.id],
      participants: [{ userId: currentUser.id, role: 'owner' }],
      workflow: {
        currentStage: 'introduction',
      },
    });
    
    toast({
      title: 'Success',
      description: 'Topic created successfully',
    });
    
    // Reset form and close modal
    setTitle('');
    setDescription('');
    setAccessCode('');
    setCategories([
      { name: 'Feature', color: '#4CAF50' },
      { name: 'Improvement', color: '#2196F3' },
    ]);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Topic</DialogTitle>
            <DialogDescription>
              Create a new brainstorming topic for your team.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input
                id="title"
                placeholder="Enter topic title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What is this brainstorming session about?"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="accessCode">Access Code (Optional)</Label>
              <Input
                id="accessCode"
                placeholder="Optional code to restrict access"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for unrestricted access within your workspace.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-background border rounded-full px-3 py-1"
                    style={{ borderColor: `${category.color}40` }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                    <button
                      type="button"
                      className="h-4 w-4 rounded-full ml-1 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      onClick={() => removeCategory(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <div
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <Input
                    placeholder="Add a category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                    className="pl-8"
                  />
                </div>
                <div className="flex shrink-0 gap-1">
                  {colorOptions.slice(0, 5).map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`h-10 w-6 rounded-md transition-all ${
                        selectedColor === color ? 'ring-2 ring-ring' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addCategory}
                  disabled={!newCategory.trim()}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Topic</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTopicModal;
