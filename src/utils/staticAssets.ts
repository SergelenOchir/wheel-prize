// Static asset mappings for prizes
export const PRIZE_ASSETS = {
  'NatureHike Outdoors': '/src/assets/nature-hike.png',
  'Compass Outdoors': '/src/assets/compass.png',
  'HiSpeed Nomin': '/src/assets/hispeed-nomin.png',
  'Vans Mongolia': '/src/assets/vans-mongolia.png',
  'Kids Toys Mongolia': '/src/assets/kids-toys.png',
  'Avandra': '/src/assets/avandra.png',
  'HobbyZone': '/src/assets/hobbyzone.png',
  'Otog Outdoors': '/src/assets/otog.png',
  'Gorkhi Family Resort': '/src/assets/gorkhi-terelj.png',
  'Wonderer Mongolia': '/src/assets/wonderer.png',
  'Cases.Mn': '/src/assets/cases.png',
  'ULTIMATE TREASURE': '/src/assets/big-prize.png',
  'Mysterious Prize #1': '/src/assets/mysterious.png',
  'Mysterious Prize #2': '/src/assets/mysterious.png',
  'Mysterious Prize #3': '/src/assets/mysterious.png',
  'Mysterious Prize #4': '/src/assets/mysterious.png',
  'Mysterious Prize #5': '/src/assets/mysterious.png',
  'Mysterious Prize #6': '/src/assets/mysterious.png',
  'Mysterious Prize #7': '/src/assets/mysterious.png',
  'Mysterious Prize #8': '/src/assets/mysterious.png',
  'Mysterious Prize #9': '/src/assets/mysterious.png',
  'Mysterious Prize #10': '/src/assets/mysterious.png',
};

// Fallback images for different categories
export const FALLBACK_IMAGES = {
  outdoor: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400',
  tech: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=400',
  fashion: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
  toys: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
  accessories: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400',
  resort: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
  mystery: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400',
  treasure: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
  default: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
};

export const getAssetForPrize = (prizeName: string): string => {
  // First try to get the specific asset
  if (PRIZE_ASSETS[prizeName as keyof typeof PRIZE_ASSETS]) {
    return PRIZE_ASSETS[prizeName as keyof typeof PRIZE_ASSETS];
  }
  
  // Fallback to category-based images
  const lowerName = prizeName.toLowerCase();
  
  if (lowerName.includes('outdoor') || lowerName.includes('nature') || lowerName.includes('compass')) {
    return FALLBACK_IMAGES.outdoor;
  }
  if (lowerName.includes('speed') || lowerName.includes('tech')) {
    return FALLBACK_IMAGES.tech;
  }
  if (lowerName.includes('vans') || lowerName.includes('fashion')) {
    return FALLBACK_IMAGES.fashion;
  }
  if (lowerName.includes('toys') || lowerName.includes('hobby')) {
    return FALLBACK_IMAGES.toys;
  }
  if (lowerName.includes('cases') || lowerName.includes('avandra')) {
    return FALLBACK_IMAGES.accessories;
  }
  if (lowerName.includes('resort') || lowerName.includes('gorkhi')) {
    return FALLBACK_IMAGES.resort;
  }
  if (lowerName.includes('mysterious') || lowerName.includes('mystery')) {
    return FALLBACK_IMAGES.mystery;
  }
  if (lowerName.includes('treasure') || lowerName.includes('ultimate')) {
    return FALLBACK_IMAGES.treasure;
  }
  
  return FALLBACK_IMAGES.default;
};

// Available static assets for selection
export const AVAILABLE_ASSETS = [
  { name: 'Nature Hike', path: '/src/assets/nature-hike.png', category: 'Outdoor' },
  { name: 'Compass', path: '/src/assets/compass.png', category: 'Outdoor' },
  { name: 'HiSpeed Nomin', path: '/src/assets/hispeed-nomin.png', category: 'Tech' },
  { name: 'Vans Mongolia', path: '/src/assets/vans-mongolia.png', category: 'Fashion' },
  { name: 'Kids Toys', path: '/src/assets/kids-toys.png', category: 'Toys' },
  { name: 'Avandra', path: '/src/assets/avandra.png', category: 'Accessories' },
  { name: 'HobbyZone', path: '/src/assets/hobbyzone.png', category: 'Toys' },
  { name: 'Otog', path: '/src/assets/otog.png', category: 'Outdoor' },
  { name: 'Gorkhi Terelj', path: '/src/assets/gorkhi-terelj.png', category: 'Resort' },
  { name: 'Wonderer', path: '/src/assets/wonderer.png', category: 'Travel' },
  { name: 'Cases', path: '/src/assets/cases.png', category: 'Accessories' },
  { name: 'Big Prize', path: '/src/assets/big-prize.png', category: 'Special' },
  { name: 'Mysterious', path: '/src/assets/mysterious.png', category: 'Mystery' },
];