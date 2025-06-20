import React, { useState, useEffect } from 'react';
import WinningChancesPage from './pages/WinningChancesPage';
import RoulettePage from './pages/RoulettePage';
import { WheelData } from './types/WheelData';
import { saveWheelData, loadWheelData } from './utils/localStorage';
import { getAssetForPrize, getOptionNameAsset } from './utils/staticAssets';

function App() {
  const [currentPage, setCurrentPage] = useState<'chances' | 'roulette'>('chances');
  
  // Distinct wheel data with varied chances, amounts, and styling
  const defaultWheelData: WheelData[] = [
    // Premium Brand Sponsors - Lower chances, higher value
    {
      option: 'NatureHike Outdoors',
      style: { backgroundColor: '#2D5016', textColor: '#ffffff' },
      chance: 8,
      amount: 3,
      image_url: getAssetForPrize('NatureHike Outdoors'),
      option_url: getOptionNameAsset('NatureHike Outdoors')
    },
    {
      option: 'Compass Outdoors',
      style: { backgroundColor: '#8B4513', textColor: '#ffffff' },
      chance: 7,
      amount: 4,
      image_url: getAssetForPrize('Compass Outdoors'),
      option_url: getOptionNameAsset('Compass Outdoors')
    },
    {
      option: 'HiSpeed Nomin',
      style: { backgroundColor: '#1E3A8A', textColor: '#ffffff' },
      chance: 6,
      amount: 2,
      image_url: getAssetForPrize('HiSpeed Nomin'),
      option_url: getOptionNameAsset('HiSpeed Nomin')
    },
    {
      option: 'Vans Mongolia',
      style: { backgroundColor: '#7C2D12', textColor: '#ffffff' },
      chance: 9,
      amount: 6,
      image_url: getAssetForPrize('Vans Mongolia'),
      option_url: getOptionNameAsset('Vans Mongolia')
    },
    {
      option: 'Kids Toys Mongolia',
      style: { backgroundColor: '#BE185D', textColor: '#ffffff' },
      chance: 12,
      amount: 8,
      image_url: getAssetForPrize('Kids Toys Mongolia'),
      option_url: getOptionNameAsset('Kids Toys Mongolia')
    },
    {
      option: 'Avandra',
      style: { backgroundColor: '#581C87', textColor: '#ffffff' },
      chance: 10,
      amount: 5,
      image_url: getAssetForPrize('Avandra'),
      option_url: getOptionNameAsset('Avandra')
    },
    {
      option: 'HobbyZone',
      style: { backgroundColor: '#059669', textColor: '#ffffff' },
      chance: 11,
      amount: 7,
      image_url: getAssetForPrize('HobbyZone'),
      option_url: getOptionNameAsset('HobbyZone')
    },
    {
      option: 'Otog Outdoors',
      style: { backgroundColor: '#B45309', textColor: '#ffffff' },
      chance: 8,
      amount: 4,
      image_url: getAssetForPrize('Otog Outdoors'),
      option_url: getOptionNameAsset('Otog Outdoors')
    },
    {
      option: 'Gorkhi Family Resort',
      style: { backgroundColor: '#0F766E', textColor: '#ffffff' },
      chance: 5,
      amount: 2,
      image_url: getAssetForPrize('Gorkhi Family Resort'),
      option_url: getOptionNameAsset('Gorkhi Family Resort')
    },
    {
      option: 'Wonderer Mongolia',
      style: { backgroundColor: '#9333EA', textColor: '#ffffff' },
      chance: 7,
      amount: 3,
      image_url: getAssetForPrize('Wonderer Mongolia'),
      option_url: getOptionNameAsset('Wonderer Mongolia')
    },
    {
      option: 'Cases.Mn',
      style: { backgroundColor: '#DC2626', textColor: '#ffffff' },
      chance: 9,
      amount: 6,
      image_url: getAssetForPrize('Cases.Mn'),
      option_url: getOptionNameAsset('Cases.Mn')
    },
    // Mysterious Prizes - Varied chances and amounts for excitement
    {
      option: 'Mysterious Prize #1',
      style: { backgroundColor: '#4C1D95', textColor: '#ffffff' },
      chance: 4,
      amount: 2,
      image_url: getAssetForPrize('Mysterious Prize #1'),
      option_url: getOptionNameAsset('Mysterious Prize #1')
    },
    {
      option: 'Mysterious Prize #2',
      style: { backgroundColor: '#7C2D12', textColor: '#ffffff' },
      chance: 6,
      amount: 3,
      image_url: getAssetForPrize('Mysterious Prize #2'),
      option_url: getOptionNameAsset('Mysterious Prize #2')
    },
    {
      option: 'Mysterious Prize #3',
      style: { backgroundColor: '#BE123C', textColor: '#ffffff' },
      chance: 3,
      amount: 1,
      image_url: getAssetForPrize('Mysterious Prize #3'),
      option_url: getOptionNameAsset('Mysterious Prize #3')
    },
    {
      option: 'Mysterious Prize #4',
      style: { backgroundColor: '#166534', textColor: '#ffffff' },
      chance: 5,
      amount: 4,
      image_url: getAssetForPrize('Mysterious Prize #4'),
      option_url: getOptionNameAsset('Mysterious Prize #4')
    },
    {
      option: 'Mysterious Prize #5',
      style: { backgroundColor: '#92400E', textColor: '#ffffff' },
      chance: 7,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #5'),
      option_url: getOptionNameAsset('Mysterious Prize #5')
    },
    {
      option: 'Mysterious Prize #6',
      style: { backgroundColor: '#1E40AF', textColor: '#ffffff' },
      chance: 4,
      amount: 2,
      image_url: getAssetForPrize('Mysterious Prize #6'),
      option_url: getOptionNameAsset('Mysterious Prize #6')
    },
    {
      option: 'Mysterious Prize #7',
      style: { backgroundColor: '#7C3AED', textColor: '#ffffff' },
      chance: 6,
      amount: 3,
      image_url: getAssetForPrize('Mysterious Prize #7'),
      option_url: getOptionNameAsset('Mysterious Prize #7')
    },
    {
      option: 'Mysterious Prize #8',
      style: { backgroundColor: '#059669', textColor: '#ffffff' },
      chance: 8,
      amount: 6,
      image_url: getAssetForPrize('Mysterious Prize #8'),
      option_url: getOptionNameAsset('Mysterious Prize #8')
    },
    {
      option: 'Mysterious Prize #9',
      style: { backgroundColor: '#C2410C', textColor: '#ffffff' },
      chance: 5,
      amount: 3,
      image_url: getAssetForPrize('Mysterious Prize #9'),
      option_url: getOptionNameAsset('Mysterious Prize #9')
    },
    {
      option: 'Mysterious Prize #10',
      style: { backgroundColor: '#BE185D', textColor: '#ffffff' },
      chance: 3,
      amount: 1,
      image_url: getAssetForPrize('Mysterious Prize #10'),
      option_url: getOptionNameAsset('Mysterious Prize #10')
    },
    // The Ultimate Treasure - Ultra rare with special gradient
    {
      option: 'ULTIMATE TREASURE',
      style: { backgroundColor: '#DC2626', textColor: '#ffffff' },
      chance: 1,
      amount: 1,
      image_url: getAssetForPrize('ULTIMATE TREASURE'),
      option_url: getOptionNameAsset('ULTIMATE TREASURE')
    },
  ];

  const [wheelData, setWheelData] = useState<WheelData[]>(defaultWheelData);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadWheelData();
    if (savedData && savedData.length > 0) {
      // Ensure all items have the amount property and updated image_url and option_url (for backward compatibility)
      const dataWithAmounts = savedData.map((item, index) => ({
        ...item,
        amount: item.amount !== undefined ? item.amount : defaultWheelData[index]?.amount || 0,
        image_url: item.image_url || getAssetForPrize(item.option),
        option_url: item.option_url || getOptionNameAsset(item.option)
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