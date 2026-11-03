import { User, Pin, Board, Comment, Notification, Message, Report, AnalyticsData } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user_1',
    username: 'elena_roche',
    displayName: 'Elena Roche',
    email: 'elena@codasa.design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Architect & Interior Stylist based in Copenhagen. Obsessed with quiet luxury, organic brutalism, and Nordic light.',
    website: 'https://elenaroche.studio',
    followersCount: 14820,
    followingCount: 312,
    isVerified: true,
    interests: ['Architecture', 'Home Decor', 'Design', 'Art'],
    isPrivate: false,
    role: 'creator',
    savedPinIds: ['pin_1', 'pin_2', 'pin_6', 'pin_12', 'pin_25'],
    likedPinIds: ['pin_1', 'pin_3', 'pin_7'],
    followingUserIds: ['user_2', 'user_3', 'user_4', 'user_7']
  },
  {
    id: 'user_2',
    username: 'kai_visuals',
    displayName: 'Kai Takahashi',
    email: 'kai@tokyocreative.io',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Photographer & Art Director exploring neo-Tokyo nocturnal light, cyber aesthetics, and futuristic UI.',
    website: 'https://kaivisuals.art',
    followersCount: 28400,
    followingCount: 420,
    isVerified: true,
    interests: ['Photography', 'Technology', 'Art', 'Travel'],
    isPrivate: false,
    role: 'creator',
    savedPinIds: ['pin_3', 'pin_8', 'pin_15', 'pin_31'],
    likedPinIds: ['pin_1', 'pin_8', 'pin_14'],
    followingUserIds: ['user_1', 'user_5']
  },
  {
    id: 'user_3',
    username: 'maya_atelier',
    displayName: 'Maya Linnea',
    email: 'maya@nordicliving.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    bio: 'Ceramicist & slow living advocate. Earthy textures, handmade pottery & morning matcha rituals.',
    website: 'https://mayaatelier.se',
    followersCount: 9230,
    followingCount: 198,
    isVerified: false,
    interests: ['DIY', 'Home Decor', 'Art', 'Food'],
    isPrivate: false,
    role: 'user',
    savedPinIds: ['pin_4', 'pin_9', 'pin_18'],
    likedPinIds: ['pin_4', 'pin_10'],
    followingUserIds: ['user_1']
  },
  {
    id: 'user_4',
    username: 'julien_chef',
    displayName: 'Chef Julien Laurent',
    email: 'julien@bistromoderne.fr',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    bio: 'Pastry chef & food alchemist. Sourdough fermentation, French bistro classics and seasonal farm-to-table.',
    website: 'https://julienlaurent.kitchen',
    followersCount: 41200,
    followingCount: 350,
    isVerified: true,
    interests: ['Food', 'Travel', 'Photography'],
    isPrivate: false,
    role: 'creator',
    savedPinIds: ['pin_5', 'pin_10', 'pin_20'],
    likedPinIds: ['pin_5', 'pin_9'],
    followingUserIds: ['user_1', 'user_3']
  },
  {
    id: 'user_5',
    username: 'sora_streetwear',
    displayName: 'Sora Kim',
    email: 'sora@seoulstyle.kr',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    bio: 'Fashion archivist & runway forecaster. Deconstructed tailoring, vintage techwear, and Seoul street style.',
    website: 'https://sorakim.style',
    followersCount: 33700,
    followingCount: 512,
    isVerified: true,
    interests: ['Fashion', 'Design', 'Photography', 'Art'],
    isPrivate: false,
    role: 'creator',
    savedPinIds: ['pin_7', 'pin_11', 'pin_19'],
    likedPinIds: ['pin_2', 'pin_7'],
    followingUserIds: ['user_2']
  },
  {
    id: 'user_6',
    username: 'alex_nordic',
    displayName: 'Alex Lindqvist',
    email: 'alex@nordicoutdoors.no',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    bio: 'Backcountry explorer, alpine photographer & cabin builder. Chasing aurora borealis in northern Norway.',
    website: 'https://lindqvistexpeditions.com',
    followersCount: 18900,
    followingCount: 245,
    isVerified: false,
    interests: ['Travel', 'Photography', 'DIY'],
    isPrivate: false,
    role: 'user',
    savedPinIds: ['pin_13', 'pin_21', 'pin_35'],
    likedPinIds: ['pin_13'],
    followingUserIds: ['user_1', 'user_2']
  },
  {
    id: 'user_7',
    username: 'codasa_curator',
    displayName: 'Codasa Editorial',
    email: 'editorial@codasa.design',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    bio: 'Official Codasa Curation Team. Highlighting the most inspiring visual thinking, design systems & creators.',
    website: 'https://codasa.design/explore',
    followersCount: 125000,
    followingCount: 88,
    isVerified: true,
    interests: ['Design', 'Architecture', 'Art', 'Technology', 'Fashion'],
    isPrivate: false,
    role: 'admin',
    savedPinIds: ['pin_1', 'pin_2', 'pin_3', 'pin_4', 'pin_5', 'pin_6'],
    likedPinIds: ['pin_1', 'pin_2', 'pin_4'],
    followingUserIds: ['user_1', 'user_2', 'user_4', 'user_5']
  },
  {
    id: 'user_demo',
    username: 'you',
    displayName: 'You (Current User)',
    email: 'you@codasa.design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Design enthusiast, visual collector, and creative thinker. Building personal inspiration boards.',
    website: 'https://myportfolio.design',
    followersCount: 428,
    followingCount: 39,
    isVerified: false,
    interests: ['Design', 'Architecture', 'Home Decor', 'Technology', 'Photography'],
    isPrivate: false,
    role: 'creator',
    savedPinIds: ['pin_1', 'pin_4', 'pin_6', 'pin_8', 'pin_14', 'pin_22'],
    likedPinIds: ['pin_1', 'pin_2', 'pin_6', 'pin_15'],
    followingUserIds: ['user_1', 'user_2', 'user_7']
  }
];

export const SEED_PINS: Pin[] = [
  {
    id: 'pin_1',
    title: 'Minimalist Concrete Villa & Zen Garden',
    description: 'Cantilevered architectural sanctuary featuring raw cast concrete, floor-to-ceiling glass pavilions, and weeping bamboo courtyard in Kyoto outskirts.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    link: 'https://architecturaldigest.com/villa-kyoto',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_1',
    boardName: 'Architectural Digest',
    tags: ['Architecture', 'Brutalism', 'Minimalism', 'Zen', 'Concrete'],
    category: 'Architecture',
    likesCount: 1420,
    savesCount: 3840,
    commentsCount: 48,
    aspectRatio: 0.75,
    dominantColor: '#8E8E93',
    createdAt: '2026-10-14T10:20:00Z'
  },
  {
    id: 'pin_2',
    title: 'Japandi Living Room With Bouclé Armchair',
    description: 'Warm textured minimalism combining Scandinavian timber tones, limewash walls, travertine coffee plinth, and tactile off-white bouclé reading chair.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    link: 'https://nordicspaces.co/japandi-interiors',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_2',
    boardName: 'Nordic Minimal Home',
    tags: ['Home Decor', 'Japandi', 'Interior Design', 'Boucle', 'Warm Minimal'],
    category: 'Home Decor',
    likesCount: 3120,
    savesCount: 9540,
    commentsCount: 82,
    aspectRatio: 0.67,
    isProduct: true,
    price: 840,
    currency: 'USD',
    inStock: true,
    brand: 'Studio Koto',
    dominantColor: '#D8C7B5',
    createdAt: '2026-10-18T14:15:00Z'
  },
  {
    id: 'pin_3',
    title: 'Tokyo Rain Reflections & Cyber Neon Alley',
    description: 'Chasing electric turquoise and saturated vermilion light through Shinjuku rain alleyways after midnight. 35mm f/1.4 cinematic grading.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    link: 'https://tokyocreative.io/prints/shinjuku-rain',
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_3',
    boardName: 'Tokyo After Dark',
    tags: ['Photography', 'Cyberpunk', 'Tokyo', 'Neon', 'Cinematic'],
    category: 'Photography',
    likesCount: 5240,
    savesCount: 12300,
    commentsCount: 114,
    aspectRatio: 0.65,
    dominantColor: '#1A237E',
    createdAt: '2026-10-21T02:40:00Z'
  },
  {
    id: 'pin_4',
    title: 'Handthrown Stoneware Matcha Bowls & Spatulas',
    description: 'Stoneware chawan glazed in volcanic ash and copper reduction. Fired for 36 hours in a wood kiln in Gothenburg.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    link: 'https://mayaatelier.se/collection/ash-glazed',
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_4',
    boardName: 'Modern Ceramics',
    tags: ['Art', 'Ceramics', 'Pottery', 'Handmade', 'Wabi-Sabi'],
    category: 'Art',
    likesCount: 980,
    savesCount: 2750,
    commentsCount: 31,
    aspectRatio: 0.8,
    isProduct: true,
    price: 65,
    currency: 'USD',
    inStock: true,
    brand: 'Maya Atelier',
    dominantColor: '#8D6E63',
    createdAt: '2026-10-22T09:00:00Z'
  },
  {
    id: 'pin_5',
    title: 'Artisan Laminated Pain Au Chocolat',
    description: 'Honeycomb alveoli structure created with 3-day cultured butter lamination and Valrhona 70% dark chocolate batons.',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
    link: 'https://julienlaurent.kitchen/recipe/artisan-lamination',
    creatorId: 'user_4',
    creator: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_5',
    boardName: 'Coffee Rituals',
    tags: ['Food', 'Baking', 'Croissant', 'Pastry', 'Gourmet'],
    category: 'Food',
    likesCount: 4620,
    savesCount: 15400,
    commentsCount: 93,
    aspectRatio: 0.72,
    dominantColor: '#D7A762',
    createdAt: '2026-10-23T07:15:00Z'
  },
  {
    id: 'pin_6',
    title: 'Sculptural Teak Credenza & Brass Hardware',
    description: 'Custom mid-century credenza inspired by Finn Juhl, rendered in hand-rubbed Danish oil with fluted drawer fronts.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    link: 'https://elenaroche.studio/works/fluted-credenza',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_2',
    boardName: 'Nordic Minimal Home',
    tags: ['Home Decor', 'Furniture', 'Teak', 'Mid-Century', 'Woodwork'],
    category: 'Home Decor',
    likesCount: 2450,
    savesCount: 7890,
    commentsCount: 44,
    aspectRatio: 0.67,
    dominantColor: '#2E7D32',
    createdAt: '2026-10-24T11:05:00Z'
  },
  {
    id: 'pin_7',
    title: 'Oversized Wool Trench & Split Hem Trouser',
    description: 'Fall winter silhouette featuring heavy melton wool, raw edge shoulders, asymmetric belt closure, and lug sole Chelsea boots.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    link: 'https://sorakim.style/lookbook/winter-vol-1',
    creatorId: 'user_5',
    creator: {
      id: 'user_5',
      username: 'sora_streetwear',
      displayName: 'Sora Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_6',
    boardName: 'Editorial Fashion',
    tags: ['Fashion', 'Streetwear', 'Trench Coat', 'Winter Style', 'Minimalist'],
    category: 'Fashion',
    likesCount: 3890,
    savesCount: 11200,
    commentsCount: 67,
    aspectRatio: 0.6,
    isProduct: true,
    price: 320,
    currency: 'USD',
    inStock: true,
    brand: 'Studio Sora',
    dominantColor: '#E0A96D',
    createdAt: '2026-10-25T16:30:00Z'
  },
  {
    id: 'pin_8',
    title: 'Custom Gasket-Mount Mechanical Keyboard & Walnut Rest',
    description: 'CNC anodized aluminium case in space navy, GMK botanical keycaps, Lubed Durock POM switches, and matching walnut wrist wrest.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    link: 'https://deskthority.net/builds/space-navy-65',
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_7',
    boardName: 'Creative Workspace Setup',
    tags: ['Technology', 'Desk Setup', 'Mechanical Keyboard', 'Gadgets', 'Productivity'],
    category: 'Technology',
    likesCount: 2980,
    savesCount: 8430,
    commentsCount: 76,
    aspectRatio: 0.75,
    isProduct: true,
    price: 245,
    currency: 'USD',
    inStock: true,
    brand: 'KeyLabs',
    dominantColor: '#263238',
    createdAt: '2026-10-26T18:00:00Z'
  },
  {
    id: 'pin_9',
    title: 'Monstera Albo Variegata in Raw Terracotta',
    description: 'Marble white sectoral variegation on fenestrated leaf, potted in custom aerated perlite and bark mix within aged Italian terracotta.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80',
    link: 'https://botanicalurban.com/albo-care',
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_2',
    boardName: 'Nordic Minimal Home',
    tags: ['Home Decor', 'Plants', 'Botanical', 'Monstera', 'Urban Jungle'],
    category: 'Home Decor',
    likesCount: 1840,
    savesCount: 5200,
    commentsCount: 39,
    aspectRatio: 0.67,
    dominantColor: '#33691E',
    createdAt: '2026-10-27T08:20:00Z'
  },
  {
    id: 'pin_10',
    title: 'Specialty Pour-Over Coffee Laboratory',
    description: 'Origami dripper setup with washed Geisha from Huila, Colombia. Notes of bergamot, jasmine blossom, and peach nectar.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    link: 'https://coffeerolodex.com/recipes/geisha-origami',
    creatorId: 'user_4',
    creator: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_5',
    boardName: 'Coffee Rituals',
    tags: ['Food', 'Coffee', 'Barista', 'Morning Routine', 'Pour Over'],
    category: 'Food',
    likesCount: 3200,
    savesCount: 7100,
    commentsCount: 52,
    aspectRatio: 0.8,
    isProduct: true,
    price: 48,
    currency: 'USD',
    inStock: true,
    brand: 'Kurasu Coffee',
    dominantColor: '#4E342E',
    createdAt: '2026-10-27T10:30:00Z'
  },
  {
    id: 'pin_11',
    title: 'Monochrome Editorial & Structural Pleats',
    description: 'High-concept architectural tailoring with folded origami silk taffeta and razor-sharp lapels against raw chalk studio walls.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    link: 'https://sorakim.style/editorial/pleated-geometry',
    creatorId: 'user_5',
    creator: {
      id: 'user_5',
      username: 'sora_streetwear',
      displayName: 'Sora Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_6',
    boardName: 'Editorial Fashion',
    tags: ['Fashion', 'Editorial', 'High Fashion', 'Monochrome', 'Styling'],
    category: 'Fashion',
    likesCount: 2790,
    savesCount: 8930,
    commentsCount: 41,
    aspectRatio: 0.67,
    dominantColor: '#424242',
    createdAt: '2026-10-28T12:00:00Z'
  },
  {
    id: 'pin_12',
    title: 'Curved Plaster Staircase in Mediterranean Retreat',
    description: 'Continuous white lime plaster spiral staircase catching the morning golden hour light in Mallorca villa project.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    link: 'https://elenaroche.studio/mallorca-villa',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_1',
    boardName: 'Architectural Digest',
    tags: ['Architecture', 'Mediterranean', 'Staircase', 'Minimalist', 'Interior'],
    category: 'Architecture',
    likesCount: 4590,
    savesCount: 14100,
    commentsCount: 95,
    aspectRatio: 0.65,
    dominantColor: '#F5F5F0',
    createdAt: '2026-10-28T14:45:00Z'
  },
  {
    id: 'pin_13',
    title: 'Lofoten Islands Stilt Cabin at Dawn',
    description: 'Traditional red rorbu stilt cabin mirrored in glassy fjord water beneath dusting of first winter snow in Reine, Norway.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    link: 'https://lindqvistexpeditions.com/norway-winter',
    creatorId: 'user_6',
    creator: {
      id: 'user_6',
      username: 'alex_nordic',
      displayName: 'Alex Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_8',
    boardName: 'Wilderness & Wanderlust',
    tags: ['Travel', 'Norway', 'Landscape', 'Mountains', 'Cabin'],
    category: 'Travel',
    likesCount: 6890,
    savesCount: 18200,
    commentsCount: 120,
    aspectRatio: 0.67,
    dominantColor: '#1E88E5',
    createdAt: '2026-10-29T06:10:00Z'
  },
  {
    id: 'pin_14',
    title: 'Ergonomic Minimalist Developer Workstation',
    description: 'Single cable Thunderbolt dock to 32-inch 4K OLED monitor, custom walnut grove desk shelf, magnetic phone stand, and Herman Miller Aeron.',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    link: 'https://minimalsetups.io/alex-desk-v4',
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_7',
    boardName: 'Creative Workspace Setup',
    tags: ['Technology', 'Workspace', 'Desk Setup', 'Productivity', 'Minimalism'],
    category: 'Technology',
    likesCount: 3870,
    savesCount: 10900,
    commentsCount: 88,
    aspectRatio: 0.75,
    dominantColor: '#37474F',
    createdAt: '2026-10-29T11:20:00Z'
  },
  {
    id: 'pin_15',
    title: 'Futuristic Dark UI Component Library',
    description: 'Glassmorphic frosted card components with micro-glow edge borders, high-contrast numeric KPIs, and electric indigo data visualizations.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    link: 'https://codasa.design/components/glow-ui',
    creatorId: 'user_7',
    creator: {
      id: 'user_7',
      username: 'codasa_curator',
      displayName: 'Codasa Editorial',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_3',
    boardName: 'Tokyo After Dark',
    tags: ['Design', 'UI UX', 'Interface', 'Dashboard', 'Digital Art'],
    category: 'Design',
    likesCount: 5120,
    savesCount: 16800,
    commentsCount: 142,
    aspectRatio: 0.68,
    dominantColor: '#311B92',
    createdAt: '2026-10-29T15:40:00Z'
  },
  {
    id: 'pin_16',
    title: 'Sculptural Wabi-Sabi Ceramic Vases in Raw Clay',
    description: 'Hand-coiled organic silhouette finished in volcanic crater glaze. Each crease celebrates the potter’s hand pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80',
    link: 'https://mayaatelier.se/crater-vessels',
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_4',
    boardName: 'Modern Ceramics',
    tags: ['DIY', 'Ceramics', 'Craft', 'Pottery', 'Decor'],
    category: 'DIY',
    likesCount: 1430,
    savesCount: 4210,
    commentsCount: 28,
    aspectRatio: 0.8,
    isProduct: true,
    price: 95,
    currency: 'USD',
    inStock: true,
    brand: 'Maya Atelier',
    dominantColor: '#795548',
    createdAt: '2026-10-30T09:15:00Z'
  },
  {
    id: 'pin_17',
    title: 'Modern Cantilevered Mountain Sanctuary in Swiss Alps',
    description: 'Black timber facade seamlessly anchored into alpine granite cliffs with 180-degree panoramic glass terrace above sea of clouds.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    link: 'https://architecturaldigest.com/swiss-haven',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_1',
    boardName: 'Architectural Digest',
    tags: ['Architecture', 'Modernist', 'Swiss Alps', 'Mountains', 'Cabin'],
    category: 'Architecture',
    likesCount: 7120,
    savesCount: 22400,
    commentsCount: 153,
    aspectRatio: 0.67,
    dominantColor: '#212121',
    createdAt: '2026-10-30T13:00:00Z'
  },
  {
    id: 'pin_18',
    title: 'Handmade Scented Botanical Soy Candles',
    description: 'Small batch hand-poured soy wax infused with wild vetiver, smoked cedar, and crushed juniper needles in reusable amber glass.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
    link: 'https://mayaatelier.se/candles/nordic-smoke',
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_4',
    boardName: 'Modern Ceramics',
    tags: ['DIY', 'Candles', 'Crafts', 'Aromatherapy', 'Home Fragrance'],
    category: 'DIY',
    likesCount: 1680,
    savesCount: 5120,
    commentsCount: 37,
    aspectRatio: 0.75,
    isProduct: true,
    price: 36,
    currency: 'USD',
    inStock: true,
    brand: 'Atelier Botanical',
    dominantColor: '#FFA000',
    createdAt: '2026-10-30T17:25:00Z'
  },
  {
    id: 'pin_19',
    title: 'Minimalist Leather Tote & Raw Brass Rivets',
    description: 'Full-grain vegetable tanned Italian bridle leather that patinas with every journey. Hand burnished beeswax edges.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    link: 'https://sorakim.style/accessories/tote-v1',
    creatorId: 'user_5',
    creator: {
      id: 'user_5',
      username: 'sora_streetwear',
      displayName: 'Sora Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_6',
    boardName: 'Editorial Fashion',
    tags: ['Fashion', 'Leather Goods', 'Tote Bag', 'Accessories', 'Minimalist'],
    category: 'Fashion',
    likesCount: 2310,
    savesCount: 6840,
    commentsCount: 49,
    aspectRatio: 0.72,
    isProduct: true,
    price: 210,
    currency: 'USD',
    inStock: true,
    brand: 'Atelier K',
    dominantColor: '#5D4037',
    createdAt: '2026-10-31T09:40:00Z'
  },
  {
    id: 'pin_20',
    title: 'Wild Blackberry & Pistachio Galette',
    description: 'Flaky rye crust folded over fresh hand-foraged mountain blackberries and crushed Bronte pistachios served with crème fraîche.',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
    link: 'https://julienlaurent.kitchen/recipes/blackberry-galette',
    creatorId: 'user_4',
    creator: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_5',
    boardName: 'Coffee Rituals',
    tags: ['Food', 'Dessert', 'Baking', 'Pastry', 'Summer Recipes'],
    category: 'Food',
    likesCount: 5490,
    savesCount: 17800,
    commentsCount: 108,
    aspectRatio: 0.67,
    dominantColor: '#880E4F',
    createdAt: '2026-10-31T14:10:00Z'
  },
  {
    id: 'pin_21',
    title: 'Misty Pine Forest Road in Dolomites Pass',
    description: 'Early autumn morning driving winding switchbacks through Val Gardena wrapped in low-hanging mountain fog.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    link: 'https://lindqvistexpeditions.com/dolomites-fog',
    creatorId: 'user_6',
    creator: {
      id: 'user_6',
      username: 'alex_nordic',
      displayName: 'Alex Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_8',
    boardName: 'Wilderness & Wanderlust',
    tags: ['Travel', 'Dolomites', 'Road Trip', 'Nature', 'Misty'],
    category: 'Travel',
    likesCount: 8430,
    savesCount: 24900,
    commentsCount: 162,
    aspectRatio: 0.65,
    dominantColor: '#455A64',
    createdAt: '2026-11-01T07:50:00Z'
  },
  {
    id: 'pin_22',
    title: 'Curved Bouclé Sectional & Travertine Table',
    description: 'Fluid architectural sofa anchor with raw edge travertine coffee slab, sculptural floor lamp, and hand-woven wool rug in Melbourne apartment.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    link: 'https://elenaroche.studio/melbourne-loft',
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_2',
    boardName: 'Nordic Minimal Home',
    tags: ['Home Decor', 'Living Room', 'Interior Design', 'Travertine', 'Modern Luxury'],
    category: 'Home Decor',
    likesCount: 3940,
    savesCount: 11900,
    commentsCount: 77,
    aspectRatio: 0.67,
    isProduct: true,
    price: 1850,
    currency: 'USD',
    inStock: true,
    brand: 'Studio Roche',
    dominantColor: '#CFD8DC',
    createdAt: '2026-11-01T12:30:00Z'
  },
  {
    id: 'pin_23',
    title: 'Monolithic Brutalist Cultural Center Facade',
    description: 'Interlocking geometric volumes and deep shadow reveals cast by midday Mediterranean sun on acid-etched beige concrete.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    link: 'https://architecturaldigest.com/brutalist-center',
    creatorId: 'user_7',
    creator: {
      id: 'user_7',
      username: 'codasa_curator',
      displayName: 'Codasa Editorial',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_1',
    boardName: 'Architectural Digest',
    tags: ['Architecture', 'Brutalism', 'Geometry', 'Concrete', 'Urban'],
    category: 'Architecture',
    likesCount: 4120,
    savesCount: 9780,
    commentsCount: 65,
    aspectRatio: 0.75,
    dominantColor: '#9E9E9E',
    createdAt: '2026-11-01T16:00:00Z'
  },
  {
    id: 'pin_24',
    title: 'Wireless Audiophile Open-Back Studio Headphones',
    description: 'Precision milled aluminum chassis, planar magnetic drivers, and breathable lambskin headband for uncompromised acoustic fidelity.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    link: 'https://soundlab.audio/master-series-pro',
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_7',
    boardName: 'Creative Workspace Setup',
    tags: ['Technology', 'Audio', 'Headphones', 'Design', 'Minimal Tech'],
    category: 'Technology',
    likesCount: 3100,
    savesCount: 8400,
    commentsCount: 63,
    aspectRatio: 0.8,
    isProduct: true,
    price: 399,
    currency: 'USD',
    inStock: true,
    brand: 'Acoustic Labs',
    dominantColor: '#212121',
    createdAt: '2026-11-01T20:15:00Z'
  },
  {
    id: 'pin_25',
    title: 'Modern Minimalist Typography Poster Series',
    description: 'Swiss style typographic grid compositions celebrating Bauhaus geometry, asymmetric balances, and high-impact micro-lettering.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    link: 'https://codasa.design/prints/swiss-grid-no4',
    creatorId: 'user_7',
    creator: {
      id: 'user_7',
      username: 'codasa_curator',
      displayName: 'Codasa Editorial',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_3',
    boardName: 'Tokyo After Dark',
    tags: ['Art', 'Design', 'Typography', 'Graphic Design', 'Poster'],
    category: 'Art',
    likesCount: 6120,
    savesCount: 18400,
    commentsCount: 110,
    aspectRatio: 0.67,
    dominantColor: '#C62828',
    createdAt: '2026-11-02T04:30:00Z'
  },
  {
    id: 'pin_26',
    title: 'Slow Ferment Sourdough Loaf with Wheat Scoring',
    description: '80% hydration country loaf baked on baking steel with open blistered crust, caramelized ear, and aromatic wild levain.',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1000&q=80',
    link: 'https://julienlaurent.kitchen/sourdough-scoring',
    creatorId: 'user_4',
    creator: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_5',
    boardName: 'Coffee Rituals',
    tags: ['Food', 'Sourdough', 'Bread', 'Baking', 'Artisan'],
    category: 'Food',
    likesCount: 4210,
    savesCount: 12900,
    commentsCount: 71,
    aspectRatio: 0.75,
    dominantColor: '#8D6E63',
    createdAt: '2026-11-02T08:15:00Z'
  },
  {
    id: 'pin_27',
    title: 'Minimalist Titanium Mechanical Wristwatch',
    description: 'Monobloc bead-blasted titanium case, skeletonized dial showcasing Swiss automatic movement, and fluoroelastomer strap.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    link: 'https://horology.design/chrono-titanium',
    creatorId: 'user_5',
    creator: {
      id: 'user_5',
      username: 'sora_streetwear',
      displayName: 'Sora Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_6',
    boardName: 'Editorial Fashion',
    tags: ['Fashion', 'Watches', 'Accessories', 'Minimalism', 'Industrial Design'],
    category: 'Fashion',
    likesCount: 3820,
    savesCount: 9140,
    commentsCount: 54,
    aspectRatio: 0.8,
    isProduct: true,
    price: 490,
    currency: 'USD',
    inStock: true,
    brand: 'Chronos Lab',
    dominantColor: '#ECEFF1',
    createdAt: '2026-11-02T11:20:00Z'
  },
  {
    id: 'pin_28',
    title: 'Hand-Carved Walnut Wooden Spoons & Salad Servers',
    description: 'Carved with Japanese gouges from fallen American black walnut, finished with food-safe cold-pressed walnut oil.',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
    link: 'https://mayaatelier.se/shop/carved-spoons',
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_4',
    boardName: 'Modern Ceramics',
    tags: ['DIY', 'Woodworking', 'Handmade', 'Kitchen', 'Crafts'],
    category: 'DIY',
    likesCount: 1940,
    savesCount: 5430,
    commentsCount: 32,
    aspectRatio: 0.67,
    isProduct: true,
    price: 52,
    currency: 'USD',
    inStock: true,
    brand: 'Maya Atelier',
    dominantColor: '#4E342E',
    createdAt: '2026-11-02T13:40:00Z'
  },
  {
    id: 'pin_29',
    title: 'Emerald Alpine Lake Reflection in Banff',
    description: 'Glacial silt suspended in Lake Moraine creating an unreal turquoise mirror under the jagged peaks of Ten Peaks.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    link: 'https://lindqvistexpeditions.com/banff-reflections',
    creatorId: 'user_6',
    creator: {
      id: 'user_6',
      username: 'alex_nordic',
      displayName: 'Alex Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_8',
    boardName: 'Wilderness & Wanderlust',
    tags: ['Travel', 'Canada', 'Lake Moraine', 'Mountains', 'Nature'],
    category: 'Travel',
    likesCount: 9420,
    savesCount: 31200,
    commentsCount: 204,
    aspectRatio: 0.65,
    dominantColor: '#00695C',
    createdAt: '2026-11-02T16:00:00Z'
  },
  {
    id: 'pin_30',
    title: 'Smart Home Ambient Lighting Installation',
    description: 'Indirect warm diffusion strips synchronized to circadian rhythm behind acoustic felt slat panels in media room.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    link: 'https://minimalsetups.io/circadian-panels',
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      isVerified: true
    },
    boardId: 'board_7',
    boardName: 'Creative Workspace Setup',
    tags: ['Technology', 'Smart Home', 'Lighting', 'Interior', 'Home Decor'],
    category: 'Technology',
    likesCount: 3410,
    savesCount: 9800,
    commentsCount: 56,
    aspectRatio: 0.75,
    dominantColor: '#FF6F00',
    createdAt: '2026-11-02T19:30:00Z'
  }
];

export const SEED_BOARDS: Board[] = [
  {
    id: 'board_1',
    name: 'Architectural Digest',
    description: 'Brutalist concrete sanctuaries, cantilevered mountain dwellings, and serene courtyards from around the globe.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_1', 'pin_12', 'pin_17', 'pin_23'],
    sections: [
      { id: 'sec_1', name: 'Cast Concrete', pinIds: ['pin_1', 'pin_23'] },
      { id: 'sec_2', name: 'Alpine Retreats', pinIds: ['pin_17'] }
    ],
    collaborators: [
      {
        id: 'user_2',
        username: 'kai_visuals',
        displayName: 'Kai Takahashi',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        role: 'editor'
      }
    ],
    category: 'Architecture',
    createdAt: '2026-09-10T12:00:00Z'
  },
  {
    id: 'board_2',
    name: 'Nordic Minimal Home',
    description: 'Warm travertine surfaces, bouclé armchairs, limewashed textures, and living plants creating quiet sanctuaries.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_1',
    creator: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_2', 'pin_6', 'pin_9', 'pin_22'],
    sections: [
      { id: 'sec_3', name: 'Living Rooms', pinIds: ['pin_2', 'pin_22'] },
      { id: 'sec_4', name: 'Plants & Botanicals', pinIds: ['pin_9'] }
    ],
    collaborators: [],
    category: 'Home Decor',
    createdAt: '2026-09-15T14:30:00Z'
  },
  {
    id: 'board_3',
    name: 'Tokyo After Dark',
    description: 'Nocturnal cyberpunk visions, neon rain puddles, high contrast UI, and kinetic typography.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_3', 'pin_15', 'pin_25'],
    sections: [
      { id: 'sec_5', name: 'Street Photography', pinIds: ['pin_3'] },
      { id: 'sec_6', name: 'Future UI Systems', pinIds: ['pin_15', 'pin_25'] }
    ],
    collaborators: [
      {
        id: 'user_5',
        username: 'sora_streetwear',
        displayName: 'Sora Kim',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
        role: 'editor'
      }
    ],
    category: 'Design',
    createdAt: '2026-09-20T18:00:00Z'
  },
  {
    id: 'board_4',
    name: 'Modern Ceramics & Earth',
    description: 'Wood-fired stoneware, ash glazes, hand-turned teaware, and raw tactile pottery.',
    coverImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_3',
    creator: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_4', 'pin_16', 'pin_18', 'pin_28'],
    sections: [],
    collaborators: [],
    category: 'Art',
    createdAt: '2026-09-22T08:15:00Z'
  },
  {
    id: 'board_5',
    name: 'Coffee Rituals & Bakery',
    description: 'Slow pour overs, sourdough ears, golden lamination, and morning table setups.',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_4',
    creator: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_5', 'pin_10', 'pin_20', 'pin_26'],
    sections: [
      { id: 'sec_7', name: 'Laminated Pastries', pinIds: ['pin_5', 'pin_20'] },
      { id: 'sec_8', name: 'Filter Beans & Gear', pinIds: ['pin_10'] }
    ],
    collaborators: [],
    category: 'Food',
    createdAt: '2026-09-25T11:00:00Z'
  },
  {
    id: 'board_6',
    name: 'Editorial Fashion & Silhouettes',
    description: 'Oversized outerwear, deconstructed tailoring, structural accessories, and architectural footwear.',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_5',
    creator: {
      id: 'user_5',
      username: 'sora_streetwear',
      displayName: 'Sora Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_7', 'pin_11', 'pin_19', 'pin_27'],
    sections: [],
    collaborators: [],
    category: 'Fashion',
    createdAt: '2026-09-28T15:20:00Z'
  },
  {
    id: 'board_7',
    name: 'Creative Workspace Setup',
    description: 'Custom mechanical keyboards, curved ultra-wides, walnut desk shelves, and audio gear.',
    coverImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_2',
    creator: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_8', 'pin_14', 'pin_24', 'pin_30'],
    sections: [],
    collaborators: [],
    category: 'Technology',
    createdAt: '2026-10-01T09:45:00Z'
  },
  {
    id: 'board_8',
    name: 'Wilderness & Wanderlust',
    description: 'Alpine fjords, misty forest switchbacks, stilt cabins, and remote northern expeditions.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    isSecret: false,
    creatorId: 'user_6',
    creator: {
      id: 'user_6',
      username: 'alex_nordic',
      displayName: 'Alex Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_13', 'pin_21', 'pin_29'],
    sections: [],
    collaborators: [],
    category: 'Travel',
    createdAt: '2026-10-05T14:10:00Z'
  },
  {
    id: 'board_secret',
    name: 'Brand Redesign Concepts (Private)',
    description: 'Confidential moodboard and color studies for upcoming seasonal product launch.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    isSecret: true,
    creatorId: 'user_demo',
    creator: {
      id: 'user_demo',
      username: 'you',
      displayName: 'You (Current User)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    pinIds: ['pin_15', 'pin_25'],
    sections: [],
    collaborators: [],
    category: 'Design',
    createdAt: '2026-10-15T18:00:00Z'
  }
];

export const SEED_COMMENTS: Comment[] = [
  {
    id: 'comm_1',
    pinId: 'pin_1',
    user: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    },
    content: 'The interplay between the board-formed concrete and the bamboo shadow patterns is breathtaking. Who was the lead engineer?',
    createdAt: '2026-10-15T12:30:00Z',
    likesCount: 14,
    replies: [
      {
        id: 'comm_1_1',
        pinId: 'pin_1',
        user: {
          id: 'user_1',
          username: 'elena_roche',
          displayName: 'Elena Roche',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
        },
        content: 'Engineered by Kengo Kuma Associates in collaboration with master stonemasons from Kyoto! The cantilever is 6.5 meters with no internal pillars.',
        createdAt: '2026-10-15T14:10:00Z',
        likesCount: 9
      }
    ]
  },
  {
    id: 'comm_2',
    pinId: 'pin_2',
    user: {
      id: 'user_3',
      username: 'maya_atelier',
      displayName: 'Maya Linnea',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    },
    content: 'That travertine plinth table! The organic vein patterns bring so much warmth to the linen textures.',
    createdAt: '2026-10-19T09:40:00Z',
    likesCount: 8
  },
  {
    id: 'comm_3',
    pinId: 'pin_5',
    user: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    content: 'Look at those distinct lamination layers. What temperature did you proof these at Julien?',
    createdAt: '2026-10-23T08:50:00Z',
    likesCount: 19,
    replies: [
      {
        id: 'comm_3_1',
        pinId: 'pin_5',
        user: {
          id: 'user_4',
          username: 'julien_chef',
          displayName: 'Chef Julien Laurent',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
        },
        content: 'Strictly 24°C with 78% relative humidity for 2.5 hours! Never exceed 26°C or the cultured butter will weep.',
        createdAt: '2026-10-23T09:20:00Z',
        likesCount: 22
      }
    ]
  }
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    type: 'save',
    sender: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    pinId: 'pin_2',
    pinImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
    boardId: 'board_2',
    boardName: 'Nordic Minimal Home',
    message: 'saved your Pin "Japandi Living Room With Bouclé Armchair" to Nordic Minimal Home',
    read: false,
    createdAt: '2026-11-03T07:15:00Z'
  },
  {
    id: 'notif_2',
    type: 'follow',
    sender: {
      id: 'user_2',
      username: 'kai_visuals',
      displayName: 'Kai Takahashi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    },
    message: 'started following you',
    read: false,
    createdAt: '2026-11-02T22:30:00Z'
  },
  {
    id: 'notif_3',
    type: 'comment',
    sender: {
      id: 'user_4',
      username: 'julien_chef',
      displayName: 'Chef Julien Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
    },
    pinId: 'pin_10',
    pinImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80',
    message: 'replied: "Strictly 24°C with 78% relative humidity..."',
    read: true,
    createdAt: '2026-11-02T15:10:00Z'
  },
  {
    id: 'notif_4',
    type: 'invite',
    sender: {
      id: 'user_1',
      username: 'elena_roche',
      displayName: 'Elena Roche',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    boardId: 'board_1',
    boardName: 'Architectural Digest',
    message: 'invited you to collaborate on board "Architectural Digest"',
    read: true,
    createdAt: '2026-11-01T18:00:00Z'
  }
];

export const SEED_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    senderId: 'user_1',
    receiverId: 'user_demo',
    text: 'Hey! Loved your recent board on Japandi aesthetics. Check out this Kyoto villa if you haven’t seen it:',
    pinAttachment: {
      id: 'pin_1',
      title: 'Minimalist Concrete Villa & Zen Garden',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    },
    createdAt: '2026-11-02T19:00:00Z',
    read: false
  },
  {
    id: 'msg_2',
    senderId: 'user_demo',
    receiverId: 'user_1',
    text: 'Thank you Elena! The bamboo reflection is pure tranquility. Adding it to my weekend inspiration.',
    createdAt: '2026-11-02T19:05:00Z',
    read: true
  },
  {
    id: 'msg_3',
    senderId: 'user_2',
    receiverId: 'user_demo',
    text: 'Are you heading to the Tokyo Design Week next month? We are setting up an interactive neon pavilion!',
    createdAt: '2026-11-01T14:20:00Z',
    read: true
  }
];

export const SEED_REPORTS: Report[] = [
  {
    id: 'rep_1',
    targetType: 'pin',
    targetId: 'pin_3',
    targetTitle: 'Suspicious External Link redirect',
    targetPreview: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    reason: 'misleading',
    details: 'User reported that the destination link redirects to a parked advertising domain.',
    reporterId: 'user_6',
    reporterName: 'Alex Lindqvist',
    status: 'pending',
    createdAt: '2026-11-02T16:45:00Z'
  },
  {
    id: 'rep_2',
    targetType: 'user',
    targetId: 'user_spam_99',
    targetTitle: 'Bot Account @crypto_moon_pins',
    reason: 'spam',
    details: 'Posting 50 identical cryptocurrency scam pins per minute with malicious shortlinks.',
    reporterId: 'user_1',
    reporterName: 'Elena Roche',
    status: 'resolved',
    createdAt: '2026-11-01T10:15:00Z'
  }
];

export const SEED_ANALYTICS: AnalyticsData = {
  impressions: 184520,
  saves: 28410,
  clicks: 9640,
  engagementRate: 15.4,
  weeklyStats: [
    { day: 'Mon', impressions: 22100, saves: 3400, clicks: 1200 },
    { day: 'Tue', impressions: 26400, saves: 4100, clicks: 1450 },
    { day: 'Wed', impressions: 24800, saves: 3800, clicks: 1310 },
    { day: 'Thu', impressions: 29500, saves: 4700, clicks: 1620 },
    { day: 'Fri', impressions: 34200, saves: 5200, clicks: 1890 },
    { day: 'Sat', impressions: 28600, saves: 4300, clicks: 1380 },
    { day: 'Sun', impressions: 18920, saves: 2910, clicks: 790 }
  ],
  topPins: [
    {
      id: 'pin_2',
      title: 'Japandi Living Room With Bouclé Armchair',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
      saves: 9540,
      impressions: 62400,
      clicks: 3400
    },
    {
      id: 'pin_1',
      title: 'Minimalist Concrete Villa & Zen Garden',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      saves: 3840,
      impressions: 28100,
      clicks: 1420
    },
    {
      id: 'pin_6',
      title: 'Sculptural Teak Credenza & Brass Hardware',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      saves: 7890,
      impressions: 41200,
      clicks: 2100
    }
  ]
};

export const POPULAR_TAGS = [
  'Architecture', 'Interior Design', 'Minimalism', 'Japandi',
  'Cyberpunk', 'Ceramics', 'Specialty Coffee', 'Bakery',
  'Streetwear', 'Workspace', 'Desk Setup', 'Travel',
  'Alps', 'DIY Crafts', 'Graphic Design', 'Typography',
  'Modern Luxury', 'Living Room', 'Food Photography'
];

export const CATEGORIES = [
  'All',
  'For You',
  'Following',
  'Architecture',
  'Home Decor',
  'Design',
  'Fashion',
  'Photography',
  'Food',
  'Technology',
  'Travel',
  'Art',
  'DIY'
];
