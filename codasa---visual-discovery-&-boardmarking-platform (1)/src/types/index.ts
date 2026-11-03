export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bio: string;
  website?: string;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  interests: string[];
  isPrivate?: boolean;
  role: 'user' | 'creator' | 'admin';
  savedPinIds: string[];
  likedPinIds: string[];
  followingUserIds: string[];
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  link?: string;
  creatorId: string;
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    isVerified?: boolean;
  };
  boardId?: string;
  boardName?: string;
  tags: string[];
  category: string;
  likesCount: number;
  savesCount: number;
  commentsCount: number;
  aspectRatio: number; // width / height
  isProduct?: boolean;
  price?: number;
  currency?: string;
  inStock?: boolean;
  brand?: string;
  dominantColor?: string;
  createdAt: string;
}

export interface BoardSection {
  id: string;
  name: string;
  pinIds: string[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  isSecret: boolean;
  creatorId: string;
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  pinIds: string[];
  sections: BoardSection[];
  collaborators: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    role: 'editor' | 'viewer';
  }[];
  category: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  pinId: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  parentId?: string;
  replies?: Comment[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'save' | 'invite' | 'system';
  sender: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  pinId?: string;
  pinImage?: string;
  boardId?: string;
  boardName?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  pinAttachment?: {
    id: string;
    title: string;
    imageUrl: string;
  };
  createdAt: string;
  read: boolean;
}

export interface Report {
  id: string;
  targetType: 'pin' | 'user' | 'comment';
  targetId: string;
  targetTitle?: string;
  targetPreview?: string;
  reason: 'spam' | 'inappropriate' | 'copyright' | 'harassment' | 'misleading' | 'other';
  details: string;
  reporterId: string;
  reporterName: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AnalyticsData {
  impressions: number;
  saves: number;
  clicks: number;
  engagementRate: number;
  weeklyStats: {
    day: string;
    impressions: number;
    saves: number;
    clicks: number;
  }[];
  topPins: {
    id: string;
    title: string;
    imageUrl: string;
    saves: number;
    impressions: number;
    clicks: number;
  }[];
}
