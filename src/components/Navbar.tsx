
import React from 'react';
import { Link } from 'react-router-dom';
import { useTopicContext } from '@/context/TopicContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Menu, Search } from 'lucide-react';

const Navbar: React.FC<{ onNewTopic?: () => void }> = ({ onNewTopic }) => {
  const { currentUser } = useTopicContext();

  return (
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
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
            <Link
              to="/recent"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Recent
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
              placeholder="Search topics..."
              className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          {onNewTopic && (
            <Button
              onClick={onNewTopic}
              size="sm"
              className="hidden md:flex gap-1 items-center"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Topic</span>
            </Button>
          )}

          {currentUser && (
            <Avatar className="h-9 w-9 transition-transform hover:scale-105">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
