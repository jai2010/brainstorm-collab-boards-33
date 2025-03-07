
import React from 'react';
import { IdeaCategory, Idea, User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ThumbsUp, MessageSquare, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BoardSummaryProps {
  ideas: Idea[];
  categories: IdeaCategory[];
  users: User[];
}

const BoardSummary: React.FC<BoardSummaryProps> = ({ ideas, categories, users }) => {
  // Prepare data for category distribution chart
  const categoryData = categories.map(category => {
    const count = ideas.filter(idea => idea.categoryId === category.id).length;
    return {
      name: category.name,
      count,
      color: category.color
    };
  });
  
  // Prepare data for votes distribution chart
  const voteData = ideas.map(idea => {
    const category = categories.find(c => c.id === idea.categoryId);
    return {
      name: idea.title.length > 20 ? idea.title.substring(0, 20) + '...' : idea.title,
      votes: idea.votes.length,
      color: category?.color || '#888888'
    };
  }).sort((a, b) => b.votes - a.votes).slice(0, 5); // Top 5 by votes
  
  // Calculate total votes and comments
  const totalVotes = ideas.reduce((acc, idea) => acc + idea.votes.length, 0);
  const uniqueVoters = new Set(ideas.flatMap(idea => idea.votes)).size;
  
  // Calculate participation rate
  const participationRate = users.length > 0 ? (uniqueVoters / users.length) * 100 : 0;
  
  // Most voted category
  const votesByCategory = categories.map(category => {
    const categoryIdeas = ideas.filter(idea => idea.categoryId === category.id);
    const votes = categoryIdeas.reduce((acc, idea) => acc + idea.votes.length, 0);
    return { ...category, votes };
  });
  
  const mostVotedCategory = votesByCategory.sort((a, b) => b.votes - a.votes)[0];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Board Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Ideas</p>
                <h3 className="text-2xl font-bold mt-1">{ideas.length}</h3>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Votes</p>
                <h3 className="text-2xl font-bold mt-1">{totalVotes}</h3>
              </div>
              <ThumbsUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Participation</p>
                <h3 className="text-2xl font-bold mt-1">{Math.round(participationRate)}%</h3>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Popular Category</p>
                {mostVotedCategory && (
                  <div className="mt-1">
                    <Badge 
                      className="text-xs font-normal" 
                      style={{ 
                        backgroundColor: `${mostVotedCategory.color}20`, 
                        color: mostVotedCategory.color, 
                        borderColor: `${mostVotedCategory.color}40` 
                      }}
                    >
                      {mostVotedCategory.name}
                    </Badge>
                  </div>
                )}
              </div>
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: mostVotedCategory?.color || '#888' }}
              >
                <ThumbsUp className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ideas by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value, name) => [`${value} ideas`, 'Count']}
                    labelFormatter={(label) => `Category: ${label}`}
                  />
                  <Bar dataKey="count" name="Ideas">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Voted Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {voteData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={voteData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <RechartsTooltip 
                      formatter={(value, name) => [`${value} votes`, 'Votes']}
                      labelFormatter={(label) => `Idea: ${label}`}
                    />
                    <Bar dataKey="votes" name="Votes">
                      {voteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No votes recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BoardSummary;
