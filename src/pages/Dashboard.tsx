
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

import DashboardSidebar from '@/components/DashboardSidebar';
import UserProfileCard from '@/components/UserProfileCard';
import RecentBoards from '@/components/RecentBoards';
import TeamActivities from '@/components/TeamActivities';
import { useAppContext } from '@/context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, usageCredits, topics, users, activities } = useAppContext();

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
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/billing')}>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/signin')}>
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
      <div className="flex flex-grow">
        <DashboardSidebar />

        <div className="flex-grow bg-muted/30 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* User Profile Section */}
            <UserProfileCard user={currentUser} usageCredits={usageCredits} />

            <header className="mb-8">
              <h1 className="text-3xl font-bold">MindBoard Dashboard</h1>
              <p className="text-muted-foreground">Manage your brainstorming sessions and collaborate with your team</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RecentBoards topics={topics} />
              <TeamActivities activities={activities} users={users} />

              {/* Quick Actions Card */}
              <div className="card-quick-actions">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="flex flex-col gap-3">
                    <Button onClick={() => navigate('/boards/create')} className="justify-start">
                      Create New Board
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/team/invite')} className="justify-start">
                      Invite Team Members
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/templates')} className="justify-start">
                      Browse Templates
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/boards')} className="justify-start">
                      View All Boards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
