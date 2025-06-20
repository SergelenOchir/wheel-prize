import React, {useState, useCallback, useEffect} from 'react';
import { Wheel } from '../components/Wheel';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';
import { Crown, Package } from 'lucide-react';
import logo from '../assets/logo.png'
import rouletteWrapper from '../assets/roulette-wrapper.png'

interface RoulettePageProps {
  data: WheelData[];
  onNavigateToChances: () => void;
  onPrizeWon: (prizeIndex: number) => void;
}

const RoulettePage: React.FC<RoulettePageProps> = ({
  data,
  onPrizeWon
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string>('');
  const [selectedPrizeImage, setSelectedPrizeImage] = useState<string>('');
  const [selectedPrizeAmount, setSelectedPrizeAmount] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const getWeightedRandomIndex = () => {
    // Filter out items with 0 amount
    const availableItems = data.filter(item => item.amount > 0);
    
    if (availableItems.length === 0) {
      // If no items available, return -1 to indicate no valid prize
      return -1;
    }

    const totalWeight = availableItems.reduce((sum, item) => sum + item.chance, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < availableItems.length; i++) {
      random -= availableItems[i].chance;
      if (random <= 0) {
        // Find the original index in the full data array
        return data.findIndex(item => item.option === availableItems[i].option);
      }
    }
    return data.findIndex(item => item.option === availableItems[0].option);
  };

  const handleSpinClick = useCallback(() => {
    if (!mustSpin && data.length > 0) {
      const newPrizeNumber = getWeightedRandomIndex();
      
      if (newPrizeNumber === -1) {
        // No prizes available
        setIsOutOfStock(true);
        setShowModal(true);
        return;
      }
      
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }, [mustSpin, data]);

  useEffect(() => {
    const handleKeyPress = (event: MouseEvent) => {
      if (event instanceof MouseEvent && event.button === 0 && !showModal) {
        event.preventDefault();
        handleSpinClick();
      }
    };

    window.addEventListener('mousedown', handleKeyPress);
    return () => {
      window.removeEventListener('mousedown', handleKeyPress);
    };
  }, [handleSpinClick, showModal]);

  const handleSpinStop = useCallback(() => {
    setMustSpin(false);
    const prize = data[prizeNumber];
    
    if (prize && prize.amount > 0) {
      setSelectedPrize(prize.option);
      setSelectedPrizeImage(prize.image_url);
      setSelectedPrizeAmount(prize.amount);
      setIsOutOfStock(false);
      
      // Decrease the amount
      onPrizeWon(prizeNumber);
    } else {
      setIsOutOfStock(true);
    }
    
    setShowModal(true);
  }, [prizeNumber, data, onPrizeWon]);

  const closeModal = () => {
    setShowModal(false);
    setIsOutOfStock(false);
  };

  // Filter data to only show items with amount > 0 for the wheel
  const availableData = data.filter(item => item.amount > 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Artboard 2 copy@3x-8.png')`,
        }}
      >
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Roulette Wheel Container */}
        <div className="flex flex-col items-center space-y-8">
          {/* Wheel Wrapper with Much Larger Size */}
          <div className="relative">
            {availableData.length > 0 ? (
              <div className="relative w-[42rem] h-[42rem] flex items-center justify-center">
                {/* Roulette Wrapper Background */}
                <img 
                  src={rouletteWrapper} 
                  alt="Roulette Wrapper" 
                  className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                  style={{
                    filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))'
                  }}
                />
                
                {/* Wheel Container - positioned behind wrapper */}
                <div className="absolute inset-0 flex items-center justify-center z-10" style={{ padding: '4.5rem' }}>
                  <div className="w-full h-full">
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={availableData.findIndex(item => item.option === data[prizeNumber]?.option)}
                      data={availableData}
                      onStopSpinning={handleSpinStop}
                      backgroundColors={availableData.map(item => item.style.backgroundColor)}
                      textColors={['#ffffff']}
                      outerBorderColor="#FAB654"
                      outerBorderWidth={8}
                      innerBorderColor="#f59e0b"
                      innerBorderWidth={4}
                      radiusLineColor="#FFD08F"
                      radiusLineWidth={1}
                      fontSize={14}
                      textDistance={65}
                      spinDuration={1.2}
                      innerRadius={0}
                      centerIcon={<img style={{width: 64, height: 64}} alt="logoImage" src={logo}/>}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-[42rem] h-[42rem] flex items-center justify-center">
                {/* Roulette Wrapper Background */}
                <img 
                  src={rouletteWrapper} 
                  alt="Roulette Wrapper" 
                  className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none opacity-50"
                />
                
                {/* Out of Stock Message */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="text-center bg-black/60 backdrop-blur-lg rounded-2xl p-8 border-4 border-red-500/50">
                    <Package className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">All Prizes Claimed!</h3>
                    <p className="text-red-400">No more items available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prize Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-amber-400/50 max-w-sm sm:max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="text-center">
              {isOutOfStock ? (
                <div className="mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-red-500/20 shadow-2xl border-2 border-red-400/50 flex items-center justify-center">
                    <Package className="w-12 h-12 text-red-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">Out of Stock!</h2>
                  <p className="text-base sm:text-lg font-semibold drop-shadow-md text-red-400">
                    All prizes have been claimed. Come back later!
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-amber-500/20 shadow-2xl border-2 border-amber-400/50">
                    <img
                      src={selectedPrizeImage}
                      alt={selectedPrize}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center hidden bg-gradient-to-r from-amber-400 to-yellow-500">
                      {getPrizeIcon(selectedPrize)}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">{selectedPrize}</h2>
                  <p className="text-base sm:text-lg font-semibold drop-shadow-md text-amber-300 mb-2">
                    Treasure Found!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-black/40 hover:bg-black/60 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-white/30 backdrop-blur-sm"
                >
                  Close
                </button>
                {!isOutOfStock && availableData.length > 0 && (
                  <button
                    onClick={() => {
                      closeModal();
                      setTimeout(() => handleSpinClick(), 100);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-amber-300/50"
                  >
                    Hunt Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoulettePage;