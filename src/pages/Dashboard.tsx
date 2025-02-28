
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, PlusCircle, Users, BookTemplate, Menu, Search } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <polygon points="2 15 22 15 22 17 2 17 2 15" />
                  <polygon points="2 11 22 11 22 13 2 13 2 11" />
                  <polygon points="2 7 22 7 22 9 2 9 2 7" />
                  <line x1="16" y1="3" x2="22" y2="3" />
                  <line x1="8" y1="3" x2="14" y2="3" />
                  <line x1="2" y1="3" x2="6" y2="3" />
                  <line x1="18" y1="19" x2="22" y2="19" />
                  <line x1="8" y1="19" x2="16" y2="19" />
                  <line x1="2" y1="19" x2="6" y2="19" />
                </svg>
              </div>
              <span className="text-lg font-medium tracking-tight">MindBoard</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                to="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/boards"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                My Boards
              </Link>
              <Link
                to="/templates"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Templates
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-grow bg-muted/30 p-4 md:p-8">
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
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <Link to="/boards/create" className="w-full h-full flex items-center">Create New Board</Link>
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
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <Link to="/boards/create" className="w-full h-full flex items-center">New Brainstorming Session</Link>
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  <Link to="/team/invite" className="w-full h-full flex items-center">Invite Team Members</Link>
                </Button>
                <Button variant="outline" className="justify-start">
                  <BookTemplate className="mr-2 h-4 w-4" />
                  <Link to="/templates" className="w-full h-full flex items-center">Browse Templates</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
