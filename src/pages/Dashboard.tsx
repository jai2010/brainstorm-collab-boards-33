
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">MindBoard Dashboard</h1>
          <p className="text-muted-foreground">Manage your brainstorming sessions and collaborate with your team</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Boards</CardTitle>
              <CardDescription>Your most recently accessed brainstorming boards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You have no recent boards yet.</p>
              <Button asChild>
                <Link to="/create-board">Create New Board</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Activities</CardTitle>
              <CardDescription>Recent activities from your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent team activities.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                <Link to="/create-board">New Brainstorming Session</Link>
              </Button>
              <Button variant="outline" className="justify-start">
                <Link to="/invite">Invite Team Members</Link>
              </Button>
              <Button variant="outline" className="justify-start">
                <Link to="/templates">Browse Templates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
