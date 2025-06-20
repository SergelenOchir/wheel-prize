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
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('NatureHike Outdoors'),
      option_url: getOptionNameAsset('NatureHike Outdoors')
    },
    {
      option: 'Mysterious Prize #1',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #1'),
      option_url: getOptionNameAsset('Mysterious Prize #1')
    },

    {
      option: 'Compass Outdoors',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Compass Outdoors'),
      option_url: getOptionNameAsset('Compass Outdoors')
    },
    {
      option: 'Mysterious Prize #2',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #2'),
      option_url: getOptionNameAsset('Mysterious Prize #2')
    },
    {
      option: 'HiSpeed Nomin',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('HiSpeed Nomin'),
      option_url: getOptionNameAsset('HiSpeed Nomin')
    },
    {
      option: 'Mysterious Prize #3',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #3'),
      option_url: getOptionNameAsset('Mysterious Prize #3')
    },
    {
      option: 'Vans Mongolia',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Vans Mongolia'),
      option_url: getOptionNameAsset('Vans Mongolia')
    },
    {
      option: 'Mysterious Prize #4',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #4'),
      option_url: getOptionNameAsset('Mysterious Prize #4')
    },
    {
      option: 'Kids Toys Mongolia',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Kids Toys Mongolia'),
      option_url: getOptionNameAsset('Kids Toys Mongolia')
    },
    {
      option: 'Mysterious Prize #5',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #5'),
      option_url: getOptionNameAsset('Mysterious Prize #5')
    },
    {
      option: 'Avandra',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Avandra'),
      option_url: getOptionNameAsset('Avandra')
    },
    {
      option: 'Mysterious Prize #6',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #6'),
      option_url: getOptionNameAsset('Mysterious Prize #6')
    },
    {
      option: 'HobbyZone',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('HobbyZone'),
      option_url: getOptionNameAsset('HobbyZone')
    },
    {
      option: 'Mysterious Prize #7',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #7'),
      option_url: getOptionNameAsset('Mysterious Prize #7')
    },
    {
      option: 'Otog Outdoors',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Otog Outdoors'),
      option_url: getOptionNameAsset('Otog Outdoors')
    },
    {
      option: 'Mysterious Prize #8',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #8'),
      option_url: getOptionNameAsset('Mysterious Prize #8')
    },
    {
      option: 'Gorkhi Family Resort',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Gorkhi Family Resort'),
      option_url: getOptionNameAsset('Gorkhi Family Resort')
    },
    {
      option: 'Mysterious Prize #9',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #9'),
      option_url: getOptionNameAsset('Mysterious Prize #9')
    },
    {
      option: 'Wonderer Mongolia',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Wonderer Mongolia'),
      option_url: getOptionNameAsset('Wonderer Mongolia')
    },
    {
      option: 'Mysterious Prize #10',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Mysterious Prize #10'),
      option_url: getOptionNameAsset('Mysterious Prize #10')
    },
    {
      option: 'Cases.Mn',
      style: { backgroundColor: '#723E00', textColor: '#ffffff' },
      chance: 5,
      amount: 5,
      image_url: getAssetForPrize('Cases.Mn'),
      option_url: getOptionNameAsset('Cases.Mn')
    },
    // The Ultimate Treasure - Ultra rare with special gradient
    {
      option: 'ULTIMATE TREASURE',
      style: { backgroundColor: '#A4580C', textColor: '#ffffff' },
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