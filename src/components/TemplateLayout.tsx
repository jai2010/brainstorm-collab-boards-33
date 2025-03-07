
import React from 'react';
import { IdeaCategory, Idea, User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IdeaCard from './IdeaCard';

interface TemplateLayoutProps {
  layout?: string;
  categories: IdeaCategory[];
  ideas: Idea[];
  users: User[];
  onIdeaClick: (idea: Idea) => void;
}

const TemplateLayout: React.FC<TemplateLayoutProps> = ({ 
  layout = 'list', 
  categories, 
  ideas, 
  users,
  onIdeaClick
}) => {
  // Find the appropriate author for an idea
  const findAuthor = (authorId: string) => {
    return users.find(user => user.id === authorId);
  };
  
  // Find category for an idea
  const findCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };
  
  // Filter ideas by category
  const filterIdeasByCategory = (categoryId: string) => {
    return ideas.filter(idea => idea.categoryId === categoryId);
  };
  
  // Render ideas in a list layout
  if (layout === 'list' || layout === 'blank') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map(idea => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            category={findCategory(idea.categoryId)}
            author={findAuthor(idea.authorId)}
            commentCount={0}
            onClick={() => onIdeaClick(idea)}
          />
        ))}
      </div>
    );
  }
  
  // Render ideas in a 2x2 grid (SWOT or Impact/Effort)
  if (layout === 'grid-2x2') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {categories.map(category => (
          <Card key={category.id} className="overflow-hidden">
            <div 
              className="p-3 text-center font-medium" 
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.name}
            </div>
            <CardContent className="p-4">
              {filterIdeasByCategory(category.id).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No ideas in this category yet</p>
              ) : (
                <div className="space-y-3">
                  {filterIdeasByCategory(category.id).map(idea => (
                    <Card 
                      key={idea.id} 
                      className="cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => onIdeaClick(idea)}
                    >
                      <CardContent className="p-3">
                        <h4 className="font-medium mb-1">{idea.title}</h4>
                        <p className="text-sm text-muted-foreground">{idea.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  // Render ideas in columns (Agile Retro)
  if (layout === 'columns-3') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categories.map(category => (
          <Card key={category.id} className="overflow-hidden">
            <div 
              className="p-3 text-center font-medium" 
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.name}
            </div>
            <CardContent className="p-4">
              {filterIdeasByCategory(category.id).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No ideas in this category yet</p>
              ) : (
                <div className="space-y-3">
                  {filterIdeasByCategory(category.id).map(idea => (
                    <Card 
                      key={idea.id} 
                      className="cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => onIdeaClick(idea)}
                    >
                      <CardContent className="p-3">
                        <h4 className="font-medium mb-1">{idea.title}</h4>
                        <p className="text-sm text-muted-foreground">{idea.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  // Default to the list layout if no recognized layout is provided
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map(idea => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          category={findCategory(idea.categoryId)}
          author={findAuthor(idea.authorId)}
          commentCount={0}
          onClick={() => onIdeaClick(idea)}
        />
      ))}
    </div>
  );
};

export default TemplateLayout;
