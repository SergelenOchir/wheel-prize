import React from 'react';
import { Trophy, RotateCw, Target, Gift, Crown, Star, Gem, Zap, Sparkles, Award } from 'lucide-react';

export const getPrizeIcon = (prize: string) => {
  // Ultimate Treasure
  if (prize === 'ULTIMATE TREASURE') {
    return <Crown className="w-8 h-8 text-yellow-400" />;
  }
  
  // Mysterious Prizes
  if (prize.includes('Mysterious Prize')) {
    return <Gem className="w-8 h-8 text-purple-400" />;
  }
  
  // Brand-specific icons
  switch (prize) {
    case 'NatureHike Outdoors':
    case 'Compass Outdoors':
    case 'Otog Outdoors':
      return <Target className="w-8 h-8 text-green-400" />;
    case 'HiSpeed Nomin':
      return <Zap className="w-8 h-8 text-orange-400" />;
    case 'Vans Mongolia':
      return <Star className="w-8 h-8 text-white" />;
    case 'Kids Toys Mongolia':
    case 'HobbyZone':
      return <Gift className="w-8 h-8 text-pink-400" />;
    case 'Avandra':
    case 'Cases.Mn':
      return <Award className="w-8 h-8 text-purple-400" />;
    case 'Gorkhi Family Resort':
      return <Sparkles className="w-8 h-8 text-teal-400" />;
    case 'Wonderer Mongolia':
      return <Trophy className="w-8 h-8 text-yellow-400" />;
    case 'Jackpot':
      return <Trophy className="w-8 h-8 text-yellow-400" />;
    case 'Free Spin':
      return <RotateCw className="w-8 h-8 text-green-400" />;
    case 'Bonus Round':
      return <Target className="w-8 h-8 text-purple-400" />;
    case 'Lucky Draw':
      return <Gift className="w-8 h-8 text-pink-400" />;
    default:
      return <Gift className="w-8 h-8 text-blue-400" />;
  }
};