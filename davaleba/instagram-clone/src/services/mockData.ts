import { User, Post, Story, Reel, Conversation, Notification, Highlight } from '../types';

export const CURRENT_USER: User = {
  id: 'user_current',
  username: 'alex.creator',
  fullName: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: '✨ Visual Storyteller & Digital Artist\n📍 Tbilisi / Worldwide\n🌿 Exploring light, architecture & nature\n📬 hello@alexmorgan.design',
  website: 'https://alexmorgan.design',
  isVerified: true,
  followersCount: 14200,
  followingCount: 489,
  postsCount: 12,
  savedPostIds: ['post_2', 'post_5'],
  likedPostIds: ['post_1', 'post_3'],
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user_1',
    username: 'elena_nature',
    fullName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Wilderness & mountain wanderer 🏔️ | Canon R5 shooter',
    followersCount: 84200,
    followingCount: 312,
    postsCount: 184,
    isFollowing: true,
    isVerified: true,
  },
  {
    id: 'user_2',
    username: 'marco.streets',
    fullName: 'Marco Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Street photography & urban geometry in Tokyo & NYC 🏙️',
    followersCount: 42100,
    followingCount: 615,
    postsCount: 96,
    isFollowing: false,
  },
  {
    id: 'user_3',
    username: 'sophia.aesthetic',
    fullName: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Interior architecture • warm tones • coffee lover ☕',
    followersCount: 195000,
    followingCount: 220,
    postsCount: 340,
    isFollowing: true,
    isVerified: true,
  },
  {
    id: 'user_4',
    username: 'david_cinema',
    fullName: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Cinematographer & Colorist 🎬 35mm film vibes',
    followersCount: 68900,
    followingCount: 410,
    postsCount: 120,
    isFollowing: false,
  },
  {
    id: 'user_5',
    username: 'nina_culinary',
    fullName: 'Nina Petrova',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    bio: 'Pastry chef & food styling 🥐 Daily sweet inspirations',
    followersCount: 31000,
    followingCount: 180,
    postsCount: 75,
    isFollowing: false,
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_current',
    userId: CURRENT_USER.id,
    username: 'Your Story',
    userAvatar: CURRENT_USER.avatar,
    isSeen: false,
    items: [
      {
        id: 's_curr_1',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Morning golden hour at the coastline 🌅',
        createdAt: '2h ago',
      }
    ]
  },
  {
    id: 'story_1',
    userId: 'user_1',
    username: 'elena_nature',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isSeen: false,
    items: [
      {
        id: 's_1_1',
        mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Hiked up the highest peak before sunrise! 🏔️✨',
        createdAt: '3h ago',
      },
      {
        id: 's_1_2',
        mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Under the starlit sky 🌌 Nothing beats this feeling.',
        createdAt: '1h ago',
      }
    ]
  },
  {
    id: 'story_2',
    userId: 'user_2',
    username: 'marco.streets',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isSeen: false,
    items: [
      {
        id: 's_2_1',
        mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Rainy Tokyo nights & neon reflections ☔🗼',
        createdAt: '4h ago',
      }
    ]
  },
  {
    id: 'story_3',
    userId: 'user_3',
    username: 'sophia.aesthetic',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isSeen: false,
    items: [
      {
        id: 's_3_1',
        mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Fresh morning brew and quiet reading corner ☕📖',
        createdAt: '5h ago',
      },
      {
        id: 's_3_2',
        mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Nordic minimalist interior inspiration for the week.',
        createdAt: '2h ago',
      }
    ]
  },
  {
    id: 'story_4',
    userId: 'user_5',
    username: 'nina_culinary',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isSeen: false,
    items: [
      {
        id: 's_4_1',
        mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Freshly baked sourdough straight out of the oven! 🥖🍞',
        createdAt: '6h ago',
      }
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    userId: 'user_1',
    username: 'elena_nature',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    location: 'Dolomites, Italy',
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    filter: 'filter-normal',
    caption: 'Lost in the magic of the alpine mist. When the dawn breaks over the peaks, time simply stops. 🏔️✨ Which mountain destination is top of your bucket list?\n\n#dolomites #naturephotography #alps #adventure #wanderlust',
    likesCount: 3412,
    commentsCount: 89,
    isLiked: true,
    isSaved: false,
    createdAt: '2 HOURS AGO',
    tags: ['dolomites', 'naturephotography', 'alps'],
    comments: [
      {
        id: 'c_1_1',
        userId: 'user_2',
        username: 'marco.streets',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        text: 'Incredible lighting! That gradient in the sky is surreal 🔥',
        createdAt: '1h ago',
        likesCount: 14,
        isLiked: true,
      },
      {
        id: 'c_1_2',
        userId: 'user_3',
        username: 'sophia.aesthetic',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        text: 'Pure peace and harmony. Adding this to my travel board immediately! 🤍',
        createdAt: '45m ago',
        likesCount: 8,
      }
    ]
  },
  {
    id: 'post_2',
    userId: 'user_2',
    username: 'marco.streets',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isVerified: false,
    location: 'Shibuya, Tokyo',
    mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    filter: 'filter-clarendon',
    caption: 'Neon dreams and rainy reflections at 2 AM in Shibuya. 🏙️🌧️ Tokyo is a living cyberpunk movie that never sleeps.\n\n#tokyo #streetphotography #cyberpunk #japan #nightwalk',
    likesCount: 1845,
    commentsCount: 42,
    isLiked: false,
    isSaved: true,
    createdAt: '5 HOURS AGO',
    tags: ['tokyo', 'streetphotography', 'japan'],
    comments: [
      {
        id: 'c_2_1',
        userId: 'user_4',
        username: 'david_cinema',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        text: 'The color grading on this is masterclass! Blade Runner vibes 🎬',
        createdAt: '3h ago',
        likesCount: 5,
      }
    ]
  },
  {
    id: 'post_3',
    userId: 'user_3',
    username: 'sophia.aesthetic',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    location: 'Copenhagen, Denmark',
    mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    filter: 'filter-juno',
    caption: 'Sunday sanctuary. Natural sunlight streaming through arched windows, textured linens, and quiet morning solitude 🕯️🪴\n\n#interiordesign #minimalism #hygge #copenhagen #architecture',
    likesCount: 5290,
    commentsCount: 114,
    isLiked: true,
    isSaved: false,
    createdAt: '8 HOURS AGO',
    tags: ['interiordesign', 'minimalism', 'hygge'],
    comments: [
      {
        id: 'c_3_1',
        userId: 'user_current',
        username: 'alex.creator',
        userAvatar: CURRENT_USER.avatar,
        text: 'The architectural symmetry here is so soothing ✨👌',
        createdAt: '6h ago',
        likesCount: 19,
      }
    ]
  },
  {
    id: 'post_4',
    userId: 'user_5',
    username: 'nina_culinary',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isVerified: false,
    location: 'Paris, France',
    mediaUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    filter: 'filter-gingham',
    caption: 'Handcrafted artisan raspberry tarts with vanilla mascarpone cream 🍓✨ The secret is baking the crust twice for ultimate crispiness!\n\n#pastrychef #frenchbakery #dessertlover #artisanfood',
    likesCount: 2190,
    commentsCount: 38,
    isLiked: false,
    isSaved: false,
    createdAt: '1 DAY AGO',
    tags: ['pastrychef', 'frenchbakery'],
    comments: []
  },
  {
    id: 'post_5',
    userId: 'user_current',
    username: 'alex.creator',
    userAvatar: CURRENT_USER.avatar,
    isVerified: true,
    location: 'Tbilisi Old Town',
    mediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    filter: 'filter-normal',
    caption: 'Colors of life: fresh vibrant Mediterranean bowl packed with crisp greens, edible blossoms, and toasted pumpkin seeds 🥗🥑 Keep feeding your creativity with wholesome fuel!\n\n#healthyfood #visualfeast #foodstyling #tbilisi',
    likesCount: 1980,
    commentsCount: 56,
    isLiked: false,
    isSaved: true,
    createdAt: '2 DAYS AGO',
    tags: ['healthyfood', 'foodstyling'],
    comments: [
      {
        id: 'c_5_1',
        userId: 'user_5',
        username: 'nina_culinary',
        userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        text: 'Gorgeous presentation! The edible flowers make it pop 🌸',
        createdAt: '1d ago',
        likesCount: 7,
      }
    ]
  }
];

export const INITIAL_REELS: Reel[] = [
  {
    id: 'reel_1',
    userId: 'user_1',
    username: 'elena_nature',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    audioName: 'Original Audio - elena_nature',
    caption: 'When the ocean waves hit the cliffs at sunset 🌊🧡 Tell me you wouldn’t stay here forever! #wanderlust #ocean #reelsviral',
    likesCount: 48920,
    commentsCount: 920,
    sharesCount: 3410,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
  },
  {
    id: 'reel_2',
    userId: 'user_2',
    username: 'marco.streets',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isVerified: false,
    videoUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    audioName: 'Synthwave Nights • Tokyo Echoes',
    caption: 'Fast-paced city life in 4K ⚡ Rush hour rhythm in Shinjuku #tokyovibes #citywalk #cinematic',
    likesCount: 23100,
    commentsCount: 412,
    sharesCount: 1100,
    isLiked: false,
    isSaved: true,
    isFollowing: false,
  },
  {
    id: 'reel_3',
    userId: 'user_3',
    username: 'sophia.aesthetic',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    videoUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    audioName: 'Lofi Coffee Beats • Study & Chill',
    caption: 'Morning routine: pouring the perfect oat milk flat white ☕✨ #morningroutine #coffeeaddict #aesthetic',
    likesCount: 95400,
    commentsCount: 1450,
    sharesCount: 7800,
    isLiked: false,
    isSaved: false,
    isFollowing: true,
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    participant: {
      id: 'user_1',
      username: 'elena_nature',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      isOnline: true,
      lastActive: 'Active now',
    },
    unreadCount: 2,
    lastMessage: {
      id: 'm_1_3',
      senderId: 'user_1',
      text: 'Check out this secret hiking spot in the Caucasus! We should plan a photo trip next month 📸',
      createdAt: '12:45 PM',
      isRead: false,
    },
    messages: [
      {
        id: 'm_1_1',
        senderId: 'user_current',
        text: 'Hey Elena! Loved your recent Dolomites series, the morning light was incredible.',
        createdAt: '12:30 PM',
        isRead: true,
      },
      {
        id: 'm_1_2',
        senderId: 'user_1',
        text: 'Thank you Alex! It took 4 hours of hiking in the dark to catch that fog sunrise 😅',
        createdAt: '12:38 PM',
        isRead: true,
      },
      {
        id: 'm_1_3',
        senderId: 'user_1',
        text: 'Check out this secret hiking spot in the Caucasus! We should plan a photo trip next month 📸',
        createdAt: '12:45 PM',
        isRead: false,
      }
    ]
  },
  {
    id: 'conv_2',
    participant: {
      id: 'user_2',
      username: 'marco.streets',
      fullName: 'Marco Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isOnline: false,
      lastActive: 'Active 2h ago',
    },
    unreadCount: 0,
    lastMessage: {
      id: 'm_2_2',
      senderId: 'user_current',
      text: 'Sounds great! I will test out the new 35mm prime lens this weekend.',
      createdAt: 'Yesterday',
      isRead: true,
    },
    messages: [
      {
        id: 'm_2_1',
        senderId: 'user_2',
        text: 'Are you still looking for vintage camera lenses in the city?',
        createdAt: 'Yesterday',
        isRead: true,
      },
      {
        id: 'm_2_2',
        senderId: 'user_current',
        text: 'Sounds great! I will test out the new 35mm prime lens this weekend.',
        createdAt: 'Yesterday',
        isRead: true,
      }
    ]
  },
  {
    id: 'conv_3',
    participant: {
      id: 'user_3',
      username: 'sophia.aesthetic',
      fullName: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      isOnline: true,
      lastActive: 'Active now',
    },
    unreadCount: 0,
    lastMessage: {
      id: 'm_3_2',
      senderId: 'user_3',
      text: 'Thanks! Let me send you the moodboard for the architectural exhibition ✨',
      createdAt: '2d ago',
      isRead: true,
    },
    messages: [
      {
        id: 'm_3_1',
        senderId: 'user_current',
        text: 'Sophia, your Scandinavian interior presets look stunning!',
        createdAt: '2d ago',
        isRead: true,
      },
      {
        id: 'm_3_2',
        senderId: 'user_3',
        text: 'Thanks! Let me send you the moodboard for the architectural exhibition ✨',
        createdAt: '2d ago',
        isRead: true,
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_1',
    username: 'elena_nature',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    type: 'like',
    postId: 'post_5',
    postMediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    createdAt: '10m',
    isRead: false,
  },
  {
    id: 'notif_2',
    userId: 'user_2',
    username: 'marco.streets',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    type: 'comment',
    postId: 'post_5',
    postMediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    commentText: 'Awesome colors! Perfect dish aesthetic 👌',
    createdAt: '45m',
    isRead: false,
  },
  {
    id: 'notif_3',
    userId: 'user_4',
    username: 'david_cinema',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    type: 'follow',
    createdAt: '3h',
    isRead: true,
    isFollowing: false,
  },
  {
    id: 'notif_4',
    userId: 'user_5',
    username: 'nina_culinary',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    type: 'like',
    postId: 'post_5',
    postMediaUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    createdAt: '1d',
    isRead: true,
  }
];

export const INITIAL_HIGHLIGHTS: Highlight[] = [
  {
    id: 'hl_1',
    title: 'Travels ✈️',
    coverUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
    items: [
      {
        id: 'hl_1_1',
        mediaUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Wandering through the streets of Rome 🇮🇹',
        createdAt: 'Jun 2025',
      }
    ]
  },
  {
    id: 'hl_2',
    title: 'Design ✨',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
    items: [
      {
        id: 'hl_2_1',
        mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Workspace layout & creative process',
        createdAt: 'Aug 2025',
      }
    ]
  },
  {
    id: 'hl_3',
    title: 'Photography 📷',
    coverUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    items: [
      {
        id: 'hl_3_1',
        mediaUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1080&q=80',
        mediaType: 'image',
        duration: 5,
        caption: 'Gear setup & analog film shots',
        createdAt: 'Oct 2025',
      }
    ]
  }
];
