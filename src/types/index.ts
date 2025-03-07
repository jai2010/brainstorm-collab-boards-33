
export type UserRole = 'owner' | 'admin' | 'participant';

export type ViewMode = 'card' | 'table';

export type IdeaCategory = {
  id: string;
  name: string;
  color: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isOnline: boolean;
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  accessCode?: string;
  scheduledDate?: Date;
  categories: IdeaCategory[];
  admins: string[]; // User IDs
  participants: { userId: string; role: UserRole }[];
  invitedEmails?: string[];
  workflow: {
    currentStage: 'introduction' | 'submission' | 'classification' | 'review' | 'voting' | 'finalization';
    stageEndDate?: Date;
  };
  layout?: string; // Added for template layouts
};

export type Idea = {
  id: string;
  topicId: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  customTags: string[];
  createdAt: Date;
  updatedAt: Date;
  votes: string[]; // User IDs
};

export type Comment = {
  id: string;
  ideaId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  parentId?: string; // For threaded comments
};

// Mock data types for development
export interface MockData {
  users: User[];
  topics: Topic[];
  ideas: Idea[];
  comments: Comment[];
}
