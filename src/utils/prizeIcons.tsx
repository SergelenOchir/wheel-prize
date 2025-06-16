import React from 'react';
import { Trophy, RotateCw, Target, Gift } from 'lucide-react';

export const getPrizeIcon = (prize: string) => {
  switch (prize) {
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