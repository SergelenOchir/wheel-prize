import React, {useState, useCallback, useEffect} from 'react';
import { Wheel } from '../components/Wheel';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';
import { Crown } from 'lucide-react';
import logo from '../assets/logo.png'

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
          {/* Wheel Wrapper with Larger Responsive Sizing */}
          <div className="relative">
            {data.length > 0 && (
              <div className="w-[28rem] h-[28rem] flex items-center justify-center">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  onStopSpinning={handleSpinStop}
                  backgroundColors={data.map(item => item.style.backgroundColor)}
                  textColors={['#ffffff']}
                  outerBorderColor="#FAB654"
                  outerBorderWidth={8}
                  innerBorderColor="#f59e0b"
                  innerBorderWidth={4}
                  radiusLineColor="#FFD08F"
                  radiusLineWidth={1}
                  fontSize={13}
                  textDistance={10}
                  spinDuration={1.2}
                  innerRadius={0}
                  centerIcon={<img style={{width: 64, height: 64}} alt="logoImage" src={logo}/>}
                />
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
                  <div className={`w-full h-full flex items-center justify-center hidden ${
                    selectedPrize === 'Try Again' 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                  }`}>
                    {getPrizeIcon(selectedPrize)}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">{selectedPrize}</h2>
                <p className={`text-base sm:text-lg font-semibold drop-shadow-md ${
                  selectedPrize === 'Try Again' ? 'text-red-400' : 'text-amber-300'
                }`}>
                  {selectedPrize === 'Try Again' ? 'Keep hunting for treasure!' : 'Treasure Found!'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
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