import React, {useState, useCallback, useEffect} from 'react';
import { Wheel } from '../components/Wheel';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';
import { Crown, Package } from 'lucide-react';
import logo from '../assets/logo.png'
import wrapperImage from '../assets/roulette-wrapper.png'

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
          {/* Responsive Wheel Wrapper */}
          <div className="relative flex items-center justify-center">
            {/* Wrapper Image - Responsive sizing */}
            <img 
              alt="wrapperImage" 
              className="absolute z-10 pointer-events-none
                w-[20rem] h-auto
                sm:w-[24rem] 
                md:w-[32rem] 
                lg:w-[40rem] 
                xl:w-[44rem]
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                -translate-y-[3.5rem]
                sm:-translate-y-[4rem]
                md:-translate-y-[5rem]
                lg:-translate-y-[6.5rem]
                xl:-translate-y-[7rem]" 
              src={wrapperImage} 
            />
            
            {/* Wheel Container - Responsive sizing to match wrapper */}
            {availableData.length > 0 ? (
              <div className="relative z-0
                w-[16rem] h-[16rem]
                sm:w-[19rem] sm:h-[19rem]
                md:w-[25rem] md:h-[25rem]
                lg:w-[31rem] lg:h-[31rem]
                xl:w-[34rem] xl:h-[34rem]
                flex items-center justify-center">
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
                  fontSize={13}
                  textDistance={60}
                  spinDuration={1.2}
                  innerRadius={0}
                  centerIcon={
                    <img 
                      style={{
                        width: 'clamp(48px, 8vw, 64px)', 
                        height: 'clamp(48px, 8vw, 64px)'
                      }} 
                      alt="logoImage" 
                      src={logo}
                    />
                  }
                />
              </div>
            ) : (
              <div className="relative z-0
                w-[16rem] h-[16rem]
                sm:w-[19rem] sm:h-[19rem]
                md:w-[25rem] md:h-[25rem]
                lg:w-[31rem] lg:h-[31rem]
                xl:w-[34rem] xl:h-[34rem]
                flex items-center justify-center bg-black/40 backdrop-blur-lg rounded-full border-4 border-red-500/50">
                <div className="text-center">
                  <Package className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">All Prizes Claimed!</h3>
                  <p className="text-red-400 text-sm sm:text-base">No more items available</p>
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