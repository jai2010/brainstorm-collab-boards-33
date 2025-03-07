
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { Topic } from '@/types';

interface RecentBoardsProps {
  topics: Topic[];
}

const RecentBoards: React.FC<RecentBoardsProps> = ({ topics }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Boards</CardTitle>
        <CardDescription>Your most recently accessed brainstorming boards</CardDescription>
      </CardHeader>
      <CardContent>
        {topics.length > 0 ? (
          <div className="space-y-4">
            {topics.map(topic => (
              <div 
                key={topic.id} 
                className="border rounded-md p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => navigate(`/boards/${topic.id}`)}
              >
                <h3 className="font-medium">{topic.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Last edited: {new Date(topic.updatedAt || topic.createdAt).toLocaleDateString()}</span>
                  <span>{topic.participants.length} participants</span>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => navigate('/boards/create')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Board
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-4">You have no recent boards yet.</p>
            <Button onClick={() => navigate('/boards/create')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Board
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBoards;
