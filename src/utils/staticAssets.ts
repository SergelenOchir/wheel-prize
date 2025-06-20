// Import all static assets
import natureHike from '../assets/nature-hike.png';
import compass from '../assets/compass.png';
import hiSpeedNomin from '../assets/hispeed-nomin.png';
import vansMongolia from '../assets/vans-mongolia.png';
import kidsToys from '../assets/kids-toys.png';
import avandra from '../assets/avandra.png';
import hobbyzone from '../assets/hobbyzone.png';
import otog from '../assets/otog.png';
import gorkhiTerelj from '../assets/gorkhi-terelj.png';
import wonderer from '../assets/wonderer.png';
import cases from '../assets/cases.png';
import bigPrize from '../assets/big-prize.png';
import mysterious from '../assets/mysterious.png';

// Static asset mappings for prizes
export const PRIZE_ASSETS = {
  'NatureHike Outdoors': natureHike,
  'Compass Outdoors': compass,
  'HiSpeed Nomin': hiSpeedNomin,
  'Vans Mongolia': vansMongolia,
  'Kids Toys Mongolia': kidsToys,
  'Avandra': avandra,
  'HobbyZone': hobbyzone,
  'Otog Outdoors': otog,
  'Gorkhi Family Resort': gorkhiTerelj,
  'Wonderer Mongolia': wonderer,
  'Cases.Mn': cases,
  'ULTIMATE TREASURE': bigPrize,
  'Mysterious Prize #1': mysterious,
  'Mysterious Prize #2': mysterious,
  'Mysterious Prize #3': mysterious,
  'Mysterious Prize #4': mysterious,
  'Mysterious Prize #5': mysterious,
  'Mysterious Prize #6': mysterious,
  'Mysterious Prize #7': mysterious,
  'Mysterious Prize #8': mysterious,
  'Mysterious Prize #9': mysterious,
  'Mysterious Prize #10': mysterious,
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
  { name: 'Nature Hike', path: natureHike, category: 'Outdoor' },
  { name: 'Compass', path: compass, category: 'Outdoor' },
  { name: 'HiSpeed Nomin', path: hiSpeedNomin, category: 'Tech' },
  { name: 'Vans Mongolia', path: vansMongolia, category: 'Fashion' },
  { name: 'Kids Toys', path: kidsToys, category: 'Toys' },
  { name: 'Avandra', path: avandra, category: 'Accessories' },
  { name: 'HobbyZone', path: hobbyzone, category: 'Toys' },
  { name: 'Otog', path: otog, category: 'Outdoor' },
  { name: 'Gorkhi Terelj', path: gorkhiTerelj, category: 'Resort' },
  { name: 'Wonderer', path: wonderer, category: 'Travel' },
  { name: 'Cases', path: cases, category: 'Accessories' },
  { name: 'Big Prize', path: bigPrize, category: 'Special' },
  { name: 'Mysterious', path: mysterious, category: 'Mystery' },
];