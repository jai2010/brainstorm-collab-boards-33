
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Topic, User, Idea } from '@/types';

// Mock data for the current user
const currentUserMock: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  avatar: "/placeholder.svg",
  role: "owner",
  isOnline: true
};

// Mock data for usage
const usageCreditsMock = {
  used: 450,
  total: 1000,
  remaining: 550,
  daysUntilRenewal: 18
};

// Mock data for topics
const topicsMock: Topic[] = [
  {
    id: "1",
    title: "Product Brainstorming Session",
    description: "Ideas for our next product release with focus on innovation and user experience. We'll be discussing features, improvements, and potential new products.",
    ownerId: "user-1",
    categories: [
      { id: "cat-1", name: "Feature", color: "#4F46E5" },
      { id: "cat-2", name: "UX", color: "#10B981" },
      { id: "cat-3", name: "Market", color: "#F59E0B" }
    ],
    participants: [
      { userId: "user-1", role: "owner" },
      { userId: "user-2", role: "admin" },
      { userId: "user-3", role: "participant" },
      { userId: "user-4", role: "participant" },
      { userId: "user-5", role: "participant" }
    ],
    workflow: {
      currentStage: "submission",
      stages: ["introduction", "submission", "classification", "review", "voting", "finalization"],
      stageStartedAt: new Date().toISOString(),
      stageEndsAt: new Date(Date.now() + 86400000).toISOString() // 1 day from now
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "2",
    title: "Marketing Campaign Ideas",
    description: "Q4 marketing strategy brainstorming session to identify key campaigns and messaging.",
    ownerId: "user-1",
    categories: [
      { id: "cat-4", name: "Social", color: "#8B5CF6" },
      { id: "cat-5", name: "Content", color: "#EC4899" },
      { id: "cat-6", name: "Events", color: "#06B6D4" }
    ],
    participants: [
      { userId: "user-1", role: "owner" },
      { userId: "user-2", role: "participant" },
      { userId: "user-6", role: "participant" }
    ],
    workflow: {
      currentStage: "review",
      stages: ["introduction", "submission", "classification", "review", "voting", "finalization"],
      stageStartedAt: new Date().toISOString(),
      stageEndsAt: new Date(Date.now() + 43200000).toISOString() // 12 hours from now
    },
    createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

// Mock data for users
const usersMock: User[] = [
  currentUserMock,
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
    role: "admin",
    isOnline: true
  },
  {
    id: "user-3",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg",
    role: "participant",
    isOnline: false
  },
  {
    id: "user-4",
    name: "Sam Taylor",
    email: "sam@example.com",
    avatar: "/placeholder.svg",
    role: "participant",
    isOnline: true
  },
  {
    id: "user-5",
    name: "Morgan Lee",
    email: "morgan@example.com",
    avatar: "/placeholder.svg",
    role: "participant",
    isOnline: false
  },
  {
    id: "user-6",
    name: "Robin Williams",
    email: "robin@example.com",
    avatar: "/placeholder.svg",
    role: "participant",
    isOnline: true
  }
];

// Mock data for team activities
const activitiesMock = [
  {
    id: "act-1",
    userId: "user-2",
    action: "created a new board",
    targetType: "topic",
    targetId: "1",
    targetName: "Product Brainstorming Session",
    timestamp: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    id: "act-2",
    userId: "user-3",
    action: "added a new idea to",
    targetType: "topic",
    targetId: "1",
    targetName: "Product Brainstorming Session",
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: "act-3",
    userId: "user-4",
    action: "voted on ideas in",
    targetType: "topic",
    targetId: "2",
    targetName: "Marketing Campaign Ideas",
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  }
];

// Define the context type
interface AppContextType {
  currentUser: User;
  usageCredits: {
    used: number;
    total: number;
    remaining: number;
    daysUntilRenewal: number;
  };
  topics: Topic[];
  users: User[];
  activities: any[];
  ideas: Idea[];
  addTopic: (topic: Partial<Topic>) => void;
  updateTopic: (topicId: string, updates: Partial<Topic>) => void;
  addIdea: (idea: Partial<Idea>) => void;
  voteIdea: (ideaId: string, userId: string) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User>(currentUserMock);
  const [usageCredits] = useState(usageCreditsMock);
  const [topics, setTopics] = useState<Topic[]>(topicsMock);
  const [users] = useState<User[]>(usersMock);
  const [activities] = useState(activitiesMock);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  // Add a new topic
  const addTopic = (topic: Partial<Topic>) => {
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      title: topic.title || "Untitled Topic",
      description: topic.description || "",
      ownerId: currentUser.id,
      categories: topic.categories || [],
      participants: [{ userId: currentUser.id, role: "owner" }],
      workflow: topic.workflow || {
        currentStage: "introduction",
        stages: ["introduction", "submission", "classification", "review", "voting", "finalization"],
        stageStartedAt: new Date().toISOString(),
        stageEndsAt: new Date(Date.now() + 86400000).toISOString() // 1 day from now
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTopics([newTopic, ...topics]);
  };

  // Update an existing topic
  const updateTopic = (topicId: string, updates: Partial<Topic>) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, ...updates, updatedAt: new Date().toISOString() } : topic
    ));
  };

  // Add a new idea
  const addIdea = (idea: Partial<Idea>) => {
    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      topicId: idea.topicId || "",
      title: idea.title || "Untitled Idea",
      content: idea.content || "",
      authorId: idea.authorId || currentUser.id,
      categoryId: idea.categoryId || "",
      customTags: idea.customTags || [],
      votes: idea.votes || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setIdeas([newIdea, ...ideas]);
  };

  // Vote on an idea
  const voteIdea = (ideaId: string, userId: string) => {
    setIdeas(ideas.map(idea => {
      if (idea.id === ideaId) {
        const hasVoted = idea.votes.includes(userId);
        const newVotes = hasVoted 
          ? idea.votes.filter(id => id !== userId) 
          : [...idea.votes, userId];
        
        return { ...idea, votes: newVotes, updatedAt: new Date() };
      }
      return idea;
    }));
  };

  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        usageCredits, 
        topics, 
        users, 
        activities, 
        ideas,
        addTopic,
        updateTopic,
        addIdea,
        voteIdea
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
