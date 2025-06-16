import React, { useState } from 'react';
import WinningChancesPage from './pages/WinningChancesPage';
import RoulettePage from './pages/RoulettePage';
import { WheelData } from './types/WheelData';

function App() {
  const [currentPage, setCurrentPage] = useState<'chances' | 'roulette'>('chances');
  const [wheelData, setWheelData] = useState<WheelData[]>([
    {
      option: 'Jackpot',
      style: { backgroundColor: '#ff6b6b', textColor: '#ffffff' },
      chance: 50,
      image_url: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Big Prize',
      style: { backgroundColor: '#4ecdc4', textColor: '#ffffff' },
      chance: 50,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Medium Prize',
      style: { backgroundColor: '#45b7d1', textColor: '#ffffff' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Free Spin',
      style: { backgroundColor: '#96ceb4', textColor: '#ffffff' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Small Prize',
      style: { backgroundColor: '#ffeaa7', textColor: '#2d3436' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Bonus Round',
      style: { backgroundColor: '#fd79a8', textColor: '#ffffff' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Lucky Draw',
      style: { backgroundColor: '#fdcb6e', textColor: '#2d3436' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Try Again',
      style: { backgroundColor: '#e17055', textColor: '#ffffff' },
      chance: 0,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ]);

  const handleDataUpdate = (newData: WheelData[]) => {
    setWheelData(newData);
  };

  const navigateToRoulette = () => {
    setCurrentPage('roulette');
  };

  const navigateToChances = () => {
    setCurrentPage('chances');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {currentPage === 'chances' ? (
        <WinningChancesPage
          data={wheelData}
          onDataUpdate={handleDataUpdate}
          onNavigateToRoulette={navigateToRoulette}
        />
      ) : (
        <RoulettePage
          data={wheelData}
          onNavigateToChances={navigateToChances}
        />
      )}
    </div>
  );
}

export default App;
