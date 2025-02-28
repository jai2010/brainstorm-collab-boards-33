
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Users, Zap, Shield, BarChart2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Features
            </Link>
            <Link to="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">
              How It Works
            </Link>
            <Link to="#testimonials" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Testimonials
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col gap-4 animate-slide-up">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    Collaborative Brainstorming, Refined
                  </h1>
                  <p className="mt-4 text-xl text-muted-foreground max-w-md">
                    Transform how your team generates and organizes ideas with our intuitive brainstorming platform.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link to="/signup">
                    <Button size="lg" className="gap-1.5">
                      <span>Start Brainstorming</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="#how-it-works">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-3xl transform -rotate-6 scale-105" />
                <div className="relative bg-white dark:bg-gray-950 rounded-xl shadow-xl overflow-hidden border border-border/20">
                  <div className="p-1 border-b border-border/30 bg-muted/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <div className="rounded-lg border border-border/50 bg-card p-3">
                      <div className="h-2 w-16 bg-muted rounded-full mb-2"></div>
                      <div className="h-3 w-full bg-muted/70 rounded-md mb-1.5"></div>
                      <div className="h-3 w-5/6 bg-muted/70 rounded-md"></div>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-card p-3">
                      <div className="h-2 w-12 bg-muted rounded-full mb-2"></div>
                      <div className="h-3 w-full bg-muted/70 rounded-md mb-1.5"></div>
                      <div className="h-3 w-3/4 bg-muted/70 rounded-md"></div>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-primary/10 p-3">
                      <div className="h-2 w-14 bg-primary/30 rounded-full mb-2"></div>
                      <div className="h-3 w-full bg-primary/20 rounded-md mb-1.5"></div>
                      <div className="h-3 w-4/5 bg-primary/20 rounded-md"></div>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-card p-3">
                      <div className="h-2 w-10 bg-muted rounded-full mb-2"></div>
                      <div className="h-3 w-full bg-muted/70 rounded-md mb-1.5"></div>
                      <div className="h-3 w-2/3 bg-muted/70 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section id="features" className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need for structured, efficient brainstorming sessions.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Topic Management</h3>
                <p className="text-muted-foreground">
                  Create multiple brainstorming topics with detailed descriptions and customizable access controls.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Access Control</h3>
                <p className="text-muted-foreground">
                  Invite-only access with custom access codes and role-based permissions for team collaboration.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Ideation Process</h3>
                <p className="text-muted-foreground">
                  Submit focused ideas with titles and categorization for organized brainstorming.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Workflow Stages</h3>
                <p className="text-muted-foreground">
                  Guide your team through the entire brainstorming process with structured workflow stages.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Visualization</h3>
                <p className="text-muted-foreground">
                  Multiple view options for ideas with filtering and sorting capabilities.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Participant Tracking</h3>
                <p className="text-muted-foreground">
                  Real-time participation monitoring with online status indicators and contribution tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple and intuitive workflow designed for productive brainstorming sessions.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Create a Topic</h3>
                <p className="text-muted-foreground">
                  Define your brainstorming focus, set up categories, and customize access controls.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Invite Participants</h3>
                <p className="text-muted-foreground">
                  Share custom invitation links with your team members to collaborate.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Submit Ideas</h3>
                <p className="text-muted-foreground">
                  Everyone contributes concise ideas with titles and categories for clarity.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  4
                </div>
                <h3 className="text-xl font-medium mb-2">Organize & Classify</h3>
                <p className="text-muted-foreground">
                  Sort and group similar ideas into meaningful clusters to identify patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  5
                </div>
                <h3 className="text-xl font-medium mb-2">Vote & Prioritize</h3>
                <p className="text-muted-foreground">
                  Team members vote on ideas to determine collective priorities.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-lg font-semibold text-primary mb-4">
                  6
                </div>
                <h3 className="text-xl font-medium mb-2">Finalize & Export</h3>
                <p className="text-muted-foreground">
                  Generate summaries and action items based on the results of your session.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-2xl bg-white dark:bg-gray-950 border border-border/40 shadow-sm">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to transform your team's brainstorming?</h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Join thousands of teams using MindBoard to collaborate more effectively.
                </p>
              </div>
              <Link to="/signup">
                <Button size="lg" className="w-full md:w-auto">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary/10 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
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
              </div>
              <p className="text-sm text-muted-foreground">
                The collaborative brainstorming platform designed for modern teams.
              </p>
            </div>
            
            <nav className="grid gap-1">
              <h3 className="text-sm font-medium">Product</h3>
              <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Integrations</Link>
            </nav>
            
            <nav className="grid gap-1">
              <h3 className="text-sm font-medium">Company</h3>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </nav>
            
            <nav className="grid gap-1">
              <h3 className="text-sm font-medium">Legal</h3>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Cookies</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Licenses</Link>
            </nav>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} MindBoard. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
