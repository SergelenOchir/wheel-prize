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
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/public/Artboard 2 copy@3x-8.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {data.length > 0 && (
          <div className="relative">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={handleSpinStop}
              backgroundColors={data.map(item => item.style.backgroundColor)}
              textColors={['#ffffff']}
              outerBorderColor="#d97706"
              outerBorderWidth={8}
              innerBorderColor="#f59e0b"
              innerBorderWidth={4}
              radiusLineColor="#ffffff"
              radiusLineWidth={3}
              fontSize={14}
              textDistance={60}
              spinDuration={1.2}
              width={200}
              height={200}
            />
            
            {/* Spin Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handleSpinClick}
                disabled={mustSpin}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-full shadow-2xl transform hover:scale-105 active:scale-95 disabled:scale-100 transition-all duration-200 pointer-events-auto border-4 border-white"
              >
                {mustSpin ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  <span className="text-sm">SPIN</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-amber-400/50 max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-amber-500/20 shadow-2xl border-2 border-amber-400/50">
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
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{selectedPrize}</h2>
                <p className={`text-lg font-semibold drop-shadow-md ${
                  selectedPrize === 'Try Again' ? 'text-red-400' : 'text-amber-300'
                }`}>
                  {selectedPrize === 'Try Again' ? 'Keep hunting for treasure!' : 'Treasure Found!'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-black/40 hover:bg-black/60 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-white/30 backdrop-blur-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    setTimeout(() => handleSpinClick(), 100);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-amber-300/50"
                >
                  Hunt Again
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