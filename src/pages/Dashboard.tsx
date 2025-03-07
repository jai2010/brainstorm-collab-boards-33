
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, PlusCircle, Users, BookTemplate, Menu, Search, User, Bell, Settings, CreditCard, BarChart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock recent boards data
  const recentBoards = [
    {
      id: '1',
      name: 'Product Brainstorming Session',
      description: 'Ideas for our next product release',
      lastEdited: '2 days ago',
      participants: 5
    },
    {
      id: '2',
      name: 'Marketing Campaign Ideas',
      description: 'Q4 marketing strategy brainstorming',
      lastEdited: '5 days ago',
      participants: 3
    }
  ];

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
            
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/billing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-grow bg-muted/30 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Profile Section */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-shrink-0">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="text-lg">U</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-semibold">Welcome back, User!</h2>
                    <p className="text-muted-foreground">user@example.com</p>
                  </div>
                  <Button variant="outline" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Usage this month</h3>
                    <span className="text-xs text-muted-foreground">450 / 1,000 credits</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center">
                    <BarChart className="mr-1 h-3 w-3" />
                    Pro Plan
                  </div>
                  <div className="bg-muted px-3 py-1 rounded-full text-xs flex items-center">
                    <span>550 credits remaining</span>
                  </div>
                  <div className="bg-muted px-3 py-1 rounded-full text-xs flex items-center">
                    <span>Renews in 18 days</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                {recentBoards.length > 0 ? (
                  <div className="space-y-4">
                    {recentBoards.map(board => (
                      <div 
                        key={board.id} 
                        className="border rounded-md p-4 hover:border-primary cursor-pointer transition-colors"
                        onClick={() => navigate(`/boards/${board.id}`)}
                      >
                        <h3 className="font-medium">{board.name}</h3>
                        <p className="text-sm text-muted-foreground">{board.description}</p>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Last edited: {board.lastEdited}</span>
                          <span>{board.participants} participants</span>
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
                <Button variant="outline" className="justify-start" onClick={() => navigate('/boards/create')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Brainstorming Session
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/team/invite')}>
                  <Users className="mr-2 h-4 w-4" />
                  Invite Team Members
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/templates')}>
                  <BookTemplate className="mr-2 h-4 w-4" />
                  Browse Templates
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
