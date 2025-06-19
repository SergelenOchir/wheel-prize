import React, { useState } from 'react';
import WinningChancesPage from './pages/WinningChancesPage';
import RoulettePage from './pages/RoulettePage';
import { WheelData } from './types/WheelData';

function App() {
  const [currentPage, setCurrentPage] = useState<'chances' | 'roulette'>('chances');
  const [wheelData, setWheelData] = useState<WheelData[]>([
    // Brand Sponsors - Alternating colors based on index
    {
      option: 'NatureHike Outdoors',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 0 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Compass Outdoors',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 1 (odd)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HiSpeed Nomin',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 2 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Vans Mongolia',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 3 (odd)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Kids Toys Mongolia',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 4 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Avandra',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 5 (odd)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HobbyZone',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 6 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Otog Outdoors',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 7 (odd)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Gorkhi Family Resort',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 8 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Wonderer Mongolia',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 9 (odd)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Cases.Mn',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 10 (even)
      chance: 4,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // 10 Mysterious Prizes - Continuing alternating pattern
    {
      option: 'Mysterious Prize #1',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 11 (odd)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #2',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 12 (even)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #3',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 13 (odd)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #4',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 14 (even)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #5',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 15 (odd)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #6',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 16 (even)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #7',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 17 (odd)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #8',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 18 (even)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #9',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' }, // Index 19 (odd)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #10',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' }, // Index 20 (even)
      chance: 2,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // The Ultimate Treasure - Now with red background
    {
      option: 'ULTIMATE TREASURE',
      style: { backgroundColor: '#DC2626', textColor: '#ffffff' }, // Red background
      chance: 35, // Remaining percentage to total 100%
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