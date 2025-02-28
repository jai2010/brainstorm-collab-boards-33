
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Topic, Idea, User, Comment, MockData } from '@/types';

// Mock data for development
const mockData: MockData = {
  users: [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'alex@example.com',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      avatar: 'https://i.pravatar.cc/150?img=2',
      email: 'sarah@example.com',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=3',
      email: 'michael@example.com',
      isOnline: true,
    },
  ],
  topics: [
    {
      id: '1',
      title: 'Product Roadmap 2024',
      description: 'Brainstorming session for our product roadmap for the next year. We need to prioritize features and improvements.',
      createdAt: new Date('2023-11-15'),
      updatedAt: new Date('2023-11-15'),
      ownerId: '1',
      accessCode: 'ROAD2024',
      categories: [
        { id: '1', name: 'Feature', color: '#4CAF50' },
        { id: '2', name: 'Improvement', color: '#2196F3' },
        { id: '3', name: 'Bug Fix', color: '#F44336' },
        { id: '4', name: 'UI/UX', color: '#9C27B0' },
      ],
      admins: ['1', '2'],
      participants: [
        { userId: '1', role: 'owner' },
        { userId: '2', role: 'admin' },
        { userId: '3', role: 'participant' },
      ],
      workflow: {
        currentStage: 'submission',
      },
    },
    {
      id: '2',
      title: 'Marketing Strategy Q1',
      description: 'Developing our marketing strategy for Q1 2024. Focus on increasing brand awareness and customer acquisition.',
      createdAt: new Date('2023-11-10'),
      updatedAt: new Date('2023-11-12'),
      ownerId: '2',
      accessCode: 'MKTQ12024',
      categories: [
        { id: '1', name: 'Digital', color: '#E91E63' },
        { id: '2', name: 'Social Media', color: '#673AB7' },
        { id: '3', name: 'Content', color: '#FF9800' },
        { id: '4', name: 'Events', color: '#607D8B' },
      ],
      admins: ['2'],
      participants: [
        { userId: '2', role: 'owner' },
        { userId: '1', role: 'participant' },
        { userId: '3', role: 'participant' },
      ],
      workflow: {
        currentStage: 'introduction',
      },
    }
  ],
  ideas: [
    {
      id: '1',
      topicId: '1',
      title: 'Implement Dark Mode',
      content: 'Add a dark mode option to improve user experience in low light environments.',
      authorId: '3',
      categoryId: '4',
      customTags: ['accessibility', 'theme'],
      createdAt: new Date('2023-11-16'),
      updatedAt: new Date('2023-11-16'),
      votes: ['1', '2'],
    },
    {
      id: '2',
      topicId: '1',
      title: 'Mobile App Performance',
      content: 'Optimize the mobile app to improve loading times and reduce battery consumption.',
      authorId: '2',
      categoryId: '2',
      customTags: ['performance', 'mobile'],
      createdAt: new Date('2023-11-16'),
      updatedAt: new Date('2023-11-16'),
      votes: ['1', '3'],
    },
    {
      id: '3',
      topicId: '1',
      title: 'API Documentation',
      content: 'Create comprehensive API documentation for developers.',
      authorId: '1',
      categoryId: '2',
      customTags: ['developer', 'documentation'],
      createdAt: new Date('2023-11-17'),
      updatedAt: new Date('2023-11-17'),
      votes: [],
    },
  ],
  comments: [
    {
      id: '1',
      ideaId: '1',
      authorId: '2',
      content: 'This would be great for battery life too!',
      createdAt: new Date('2023-11-16'),
    },
    {
      id: '2',
      ideaId: '1',
      authorId: '1',
      content: 'We should also consider adding a system preference detection.',
      createdAt: new Date('2023-11-17'),
      parentId: '1',
    },
  ],
};

// Context type
type TopicContextType = {
  topics: Topic[];
  ideas: Idea[];
  users: User[];
  comments: Comment[];
  currentUser: User | null;
  addTopic: (topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  voteIdea: (ideaId: string, userId: string) => void;
  setCurrentUser: (user: User | null) => void;
};

// Create context
const TopicContext = createContext<TopicContextType | undefined>(undefined);

// Provider component
export const TopicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(mockData.topics);
  const [ideas, setIdeas] = useState<Idea[]>(mockData.ideas);
  const [users, setUsers] = useState<User[]>(mockData.users);
  const [comments, setComments] = useState<Comment[]>(mockData.comments);
  const [currentUser, setCurrentUser] = useState<User | null>(mockData.users[0]); // Default to first user for development

  // Add a new topic
  const addTopic = (topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTopic: Topic = {
      ...topic,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTopics([...topics, newTopic]);
  };

  // Add a new idea
  const addIdea = (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIdea: Idea = {
      ...idea,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      votes: [],
    };
    setIdeas([...ideas, newIdea]);
  };

  // Add a new comment
  const addComment = (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setComments([...comments, newComment]);
  };

  // Vote for an idea
  const voteIdea = (ideaId: string, userId: string) => {
    setIdeas(
      ideas.map((idea) => {
        if (idea.id === ideaId) {
          // Toggle vote
          const hasVoted = idea.votes.includes(userId);
          if (hasVoted) {
            return {
              ...idea,
              votes: idea.votes.filter((id) => id !== userId),
              updatedAt: new Date(),
            };
          } else {
            return {
              ...idea,
              votes: [...idea.votes, userId],
              updatedAt: new Date(),
            };
          }
        }
        return idea;
      })
    );
  };

  // Provide the context
  const value = {
    topics,
    ideas,
    users,
    comments,
    currentUser,
    addTopic,
    addIdea,
    addComment,
    voteIdea,
    setCurrentUser,
  };

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
};

// Custom hook to use the topic context
export const useTopicContext = () => {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopicContext must be used within a TopicProvider');
  }
  return context;
};
