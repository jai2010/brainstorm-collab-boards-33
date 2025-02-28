
import React, { useState } from 'react';
import { useTopicContext } from '@/context/TopicContext';
import { IdeaCategory, Topic } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, PlusCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewIdeaFormProps {
  topic: Topic;
  onSuccess?: () => void;
}

const NewIdeaForm: React.FC<NewIdeaFormProps> = ({ topic, onSuccess }) => {
  const { addIdea, currentUser } = useTopicContext();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(topic.categories[0]?.id || '');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const MAX_CHARS = 250;
  const charsLeft = MAX_CHARS - content.length;
  
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an idea title',
        variant: 'destructive',
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter idea content',
        variant: 'destructive',
      });
      return;
    }
    
    if (!categoryId) {
      toast({
        title: 'Error',
        description: 'Please select a category',
        variant: 'destructive',
      });
      return;
    }
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit an idea',
        variant: 'destructive',
      });
      return;
    }
    
    // Add the idea
    addIdea({
      topicId: topic.id,
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.id,
      categoryId,
      customTags: tags,
      votes: [], // Adding the missing votes property as an empty array
    });
    
    // Reset form
    setTitle('');
    setContent('');
    setCategoryId(topic.categories[0]?.id || '');
    setTags([]);
    
    // Notify
    toast({
      title: 'Success',
      description: 'Your idea has been submitted',
    });
    
    // Callback
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <Card className="border border-border/40">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a clear, concise title for your idea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
            <div className="text-xs text-right text-muted-foreground">
              {title.length}/50
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="content">Idea Description</Label>
            <Textarea
              id="content"
              placeholder="Describe your idea in detail (max 250 characters)"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
              className={charsLeft < 20 ? (charsLeft < 10 ? 'border-red-500' : 'border-orange-500') : ''}
            />
            <div className={`text-xs text-right ${
              charsLeft < 20 ? (charsLeft < 10 ? 'text-red-500' : 'text-orange-500') : 'text-muted-foreground'
            }`}>
              {charsLeft} characters left
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {topic.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-2 py-0.5"
                >
                  <span className="text-xs">{tag}</span>
                  <button
                    type="button"
                    className="h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tags related to your idea"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
                disabled={!newTag.trim() || tags.includes(newTag.trim())}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button type="submit" disabled={!title.trim() || !content.trim() || !categoryId} className="gap-1">
            <Send className="h-4 w-4" />
            <span>Submit</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewIdeaForm;
