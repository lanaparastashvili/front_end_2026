export type Comment = {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  votes: number;
  isOwn?: boolean;
  replies?: Comment[];
  replyingTo?: string;
};
