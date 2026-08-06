import type { Comment } from '../types/comment';

export const initialComments: Comment[] = [
  {
    id: '1',
    author: 'amyrobson',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=amyrobson',
    timestamp: '1 month ago',
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    votes: 12,
    replies: [],
  },
  {
    id: '2',
    author: 'maxblagun',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=maxblagun',
    timestamp: '2 weeks ago',
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    votes: 5,
    replies: [
      {
        id: '3',
        author: 'ramsesmiron',
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=ramsesmiron',
        timestamp: '1 week ago',
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        votes: 4,
        replyingTo: 'maxblagun',
        replies: [],
      },
      {
        id: '4',
        author: 'juliusomo',
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=juliusomo',
        timestamp: '2 days ago',
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        votes: 2,
        isOwn: true,
        replyingTo: 'ramsesmiron',
        replies: [],
      },
    ],
  },
];

export const currentUser = {
  author: 'juliusomo',
  avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=juliusomo',
};
