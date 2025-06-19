import React, { useState } from 'react';
import WinningChancesPage from './pages/WinningChancesPage';
import RoulettePage from './pages/RoulettePage';
import { WheelData } from './types/WheelData';

function App() {
  const [currentPage, setCurrentPage] = useState<'chances' | 'roulette'>('chances');
  const [wheelData, setWheelData] = useState<WheelData[]>([
    // Brand Sponsors
    {
      option: 'NatureHike Outdoors',
      style: { backgroundColor: '#2D5016', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Compass Outdoors',
      style: { backgroundColor: '#8B4513', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HiSpeed Nomin',
      style: { backgroundColor: '#FF4500', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Vans Mongolia',
      style: { backgroundColor: '#000000', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Kids Toys Mongolia',
      style: { backgroundColor: '#FF69B4', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Avandra',
      style: { backgroundColor: '#4B0082', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HobbyZone',
      style: { backgroundColor: '#FF6347', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Otog Outdoors',
      style: { backgroundColor: '#228B22', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Gorkhi Family Resort',
      style: { backgroundColor: '#20B2AA', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Wonderer Mongolia',
      style: { backgroundColor: '#DAA520', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Cases.Mn',
      style: { backgroundColor: '#483D8B', textColor: '#ffffff' },
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // 10 Mysterious Prizes
    {
      option: 'Mysterious Prize #1',
      style: { backgroundColor: '#2C1810', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #2',
      style: { backgroundColor: '#1A1A2E', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #3',
      style: { backgroundColor: '#16213E', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #4',
      style: { backgroundColor: '#0F3460', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #5',
      style: { backgroundColor: '#533A71', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #6',
      style: { backgroundColor: '#6A4C93', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #7',
      style: { backgroundColor: '#2E1065', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #8',
      style: { backgroundColor: '#4A148C', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #9',
      style: { backgroundColor: '#1B1464', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #10',
      style: { backgroundColor: '#3C1874', textColor: '#FFD700' },
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // The Ultimate Treasure
    {
      option: 'ULTIMATE TREASURE',
      style: { backgroundColor: '#FFD700', textColor: '#8B0000' },
      chance: 1,
      image_url: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400'
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