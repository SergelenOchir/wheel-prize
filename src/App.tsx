import React, { useState, useEffect } from 'react';
import WinningChancesPage from './pages/WinningChancesPage';
import RoulettePage from './pages/RoulettePage';
import { WheelData } from './types/WheelData';
import { saveWheelData, loadWheelData } from './utils/localStorage';

function App() {
  const [currentPage, setCurrentPage] = useState<'chances' | 'roulette'>('chances');
  
  // Default wheel data with updated amounts and percentages
  const defaultWheelData: WheelData[] = [
    // Brand Sponsors - All with 5% chance and 5 amount
    {
      option: 'NatureHike Outdoors',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Compass Outdoors',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HiSpeed Nomin',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Vans Mongolia',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Kids Toys Mongolia',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Avandra',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'HobbyZone',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Otog Outdoors',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Gorkhi Family Resort',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Wonderer Mongolia',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Cases.Mn',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // 10 Mysterious Prizes - All with 5% chance and 5 amount
    {
      option: 'Mysterious Prize #1',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #2',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #3',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #4',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #5',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #6',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #7',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #8',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #9',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      option: 'Mysterious Prize #10',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // The Ultimate Treasure - 1% chance and 1 amount (very rare!)
    {
      option: 'ULTIMATE TREASURE',
      style: { backgroundColor: '#DC2626', textColor: '#ffffff' },
      chance: 1,
      amount: 1,
      image_url: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const [wheelData, setWheelData] = useState<WheelData[]>(defaultWheelData);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadWheelData();
    if (savedData && savedData.length > 0) {
      // Ensure all items have the amount property (for backward compatibility)
      const dataWithAmounts = savedData.map((item, index) => ({
        ...item,
        amount: item.amount !== undefined ? item.amount : defaultWheelData[index]?.amount || 0
      }));
      setWheelData(dataWithAmounts);
    }
    setIsInitialLoad(false);
  }, []);

  // Save data to localStorage whenever wheelData changes (except on initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      saveWheelData(wheelData);
    }
  }, [wheelData, isInitialLoad]);

  const handleDataUpdate = (newData: WheelData[]) => {
    setWheelData(newData);
  };

  const handlePrizeWon = (prizeIndex: number) => {
    setWheelData(prevData => {
      const newData = [...prevData];
      if (newData[prizeIndex].amount > 0) {
        newData[prizeIndex] = {
          ...newData[prizeIndex],
          amount: newData[prizeIndex].amount - 1
        };
      }
      return newData;
    });
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
          onPrizeWon={handlePrizeWon}
        />
      )}
    </div>
  );
}

export default App;