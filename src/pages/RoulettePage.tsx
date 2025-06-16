import React, {useState, useCallback, useEffect} from 'react';
import { Wheel } from 'react-custom-roulette';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';

interface RoulettePageProps {
  data: WheelData[];
  onNavigateToChances: () => void;
}

const RoulettePage: React.FC<RoulettePageProps> = ({
  data,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string>('');
  const [selectedPrizeImage, setSelectedPrizeImage] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // Create alternating brown color scheme for elegant wooden look
  const wheelColors = data.map((_, index) => {
    const brownShades = [
      '#8B4513', // Saddle Brown
      '#A0522D', // Sienna
      '#CD853F', // Peru
      '#D2691E', // Chocolate
      '#B8860B', // Dark Goldenrod
      '#DAA520', // Goldenrod
      '#BC8F8F', // Rosy Brown
      '#F4A460', // Sandy Brown
    ];
    return brownShades[index % brownShades.length];
  });

  const getWeightedRandomIndex = () => {
    const totalWeight = data.reduce((sum, item) => sum + item.chance, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < data.length; i++) {
      random -= data[i].chance;
      if (random <= 0) {
        return i;
      }
    }
    return 0;
  };

  const handleSpinClick = useCallback(() => {
    if (!mustSpin && data.length > 0) {
      const newPrizeNumber = getWeightedRandomIndex();
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }, [mustSpin, data]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !showModal) {
        event.preventDefault();
        handleSpinClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSpinClick, showModal]);

  const handleSpinStop = useCallback(() => {
    setMustSpin(false);
    const prize = data[prizeNumber].option;
    const prizeImage = data[prizeNumber].image_url;
    setSelectedPrize(prize);
    setSelectedPrizeImage(prizeImage);
    setShowModal(true);
  }, [prizeNumber, data]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-amber-500 rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {data.length > 0 && (
          <div className="relative">
            {/* Outer Decorative Ring */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-2 shadow-2xl">
              <div className="rounded-full bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-700 p-1">
                <div className="rounded-full bg-gradient-to-r from-amber-800 via-yellow-800 to-orange-800 p-4">
                  {/* Decorative Dots around the wheel */}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full shadow-lg"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-${200}px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pointer/Arrow */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-orange-500 drop-shadow-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400"></div>
              </div>
            </div>

            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={handleSpinStop}
              backgroundColors={wheelColors}
              textColors={['#FFFFFF']}
              outerBorderColor="#8B4513"
              outerBorderWidth={12}
              innerBorderColor="#DAA520"
              innerBorderWidth={6}
              radiusLineColor="#F4E4BC"
              radiusLineWidth={2}
              fontSize={16}
              fontWeight={600}
              textDistance={70}
              spinDuration={2.5}
              width={400}
              height={400}
            />
            
            {/* Center Hub */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-700 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                  <button
                    onClick={handleSpinClick}
                    disabled={mustSpin}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 disabled:from-gray-400 disabled:to-gray-500 text-amber-900 font-bold rounded-full shadow-lg transform hover:scale-105 active:scale-95 disabled:scale-100 transition-all duration-200 pointer-events-auto border-2 border-yellow-200"
                  >
                    {mustSpin ? (
                      <div className="w-4 h-4 border-2 border-amber-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      <span className="text-xs font-bold">SPIN</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-amber-800 font-semibold text-lg mb-2">
            Click the center button or press <kbd className="px-2 py-1 bg-amber-200 rounded text-sm font-mono">Enter</kbd> to spin!
          </p>
          <div className="flex items-center justify-center gap-4 text-amber-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm">Wooden Fortune Wheel</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 backdrop-blur-lg rounded-3xl p-8 border-4 border-amber-400 max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-200 to-yellow-200 shadow-2xl border-4 border-amber-400">
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
                  <div className={`w-full h-full flex items-center justify-center hidden ${
                    selectedPrize === 'Try Again' 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                  }`}>
                    {getPrizeIcon(selectedPrize)}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-amber-900 mb-2 drop-shadow-lg">{selectedPrize}</h2>
                <p className={`text-lg font-semibold drop-shadow-md ${
                  selectedPrize === 'Try Again' ? 'text-red-600' : 'text-amber-700'
                }`}>
                  {selectedPrize === 'Try Again' ? 'Keep spinning for fortune!' : 'Congratulations! 🎉'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-amber-400"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    setTimeout(() => handleSpinClick(), 100);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-amber-300"
                >
                  Spin Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoulettePage;