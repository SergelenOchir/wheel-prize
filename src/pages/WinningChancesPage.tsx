import React, { useState } from 'react';
import { Edit3, Save, X, Trash2, Plus, Play, ArrowRight, Package, RotateCcw, Image, Crown, Gift, Gem } from 'lucide-react';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';
import { clearWheelData } from '../utils/localStorage';
import { getAssetForPrize, getOptionNameAsset } from '../utils/staticAssets';

interface WinningChancesPageProps {
  data: WheelData[];
  onDataUpdate: (data: WheelData[]) => void;
  onNavigateToRoulette: () => void;
}

const WinningChancesPage: React.FC<WinningChancesPageProps> = ({
  data,
  onDataUpdate,
  onNavigateToRoulette
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<WheelData[]>([]);

  const handleEditStart = () => {
    setTempData([...data]);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setTempData([]);
    setIsEditing(false);
  };

  const handleEditSave = () => {
    const totalChance = tempData.reduce((sum, item) => sum + item.chance, 0);
    if (totalChance <= 0) {
      alert('Total chances must be greater than 0');
      return;
    }
    if (tempData.length === 0) {
      alert('At least one prize is required');
      return;
    }
    onDataUpdate([...tempData]);
    setTempData([]);
    setIsEditing(false);
  };

  const handleResetStock = () => {
    if (confirm('Are you sure you want to reset all stock amounts to their original values? This will clear all localStorage data.')) {
      clearWheelData();
      window.location.reload(); // Reload to get default data
    }
  };

  const handleChanceChange = (index: number, newChance: number) => {
    const updatedData = [...tempData];
    updatedData[index] = { ...updatedData[index], chance: Math.max(0, newChance) };
    setTempData(updatedData);
  };

  const handleAmountChange = (index: number, newAmount: number) => {
    const updatedData = [...tempData];
    updatedData[index] = { ...updatedData[index], amount: Math.max(0, newAmount) };
    setTempData(updatedData);
  };

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedData = [...tempData];
    updatedData[index] = { 
      ...updatedData[index], 
      option: newOption,
      image_url: getAssetForPrize(newOption), // Auto-update image based on name
      option_url: getOptionNameAsset(newOption) // Auto-update option name image
    };
    setTempData(updatedData);
  };

  const handleRemoveItem = (index: number) => {
    if (tempData.length <= 1) {
      alert('At least one prize is required');
      return;
    }
    const updatedData = tempData.filter((_, i) => i !== index);
    setTempData(updatedData);
  };

  const handleAddItem = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#fdcb6e', '#e17055'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newItem: WheelData = {
      option: 'New Prize',
      style: { backgroundColor: randomColor, textColor: '#ffffff' },
      chance: 10,
      amount: 10,
      image_url: getAssetForPrize('New Prize'),
      option_url: getOptionNameAsset('New Prize')
    };
    
    setTempData([...tempData, newItem]);
  };

  const currentData = isEditing ? tempData : data;
  
  // Calculate totals based on original chance values (not the processed ones)
  const totalChance = currentData.reduce((sum, item) => sum + (item.amount > 0 ? item.chance : 0), 0);
  const totalItems = currentData.reduce((sum, item) => sum + item.amount, 0);
  const availableItems = currentData.filter(item => item.amount > 0).length;

  // Categorize prizes for better organization
  const brandSponsors = currentData.filter(item => 
    !item.option.includes('Mysterious') && item.option !== 'ULTIMATE TREASURE'
  );
  const mysteriousPrizes = currentData.filter(item => 
    item.option.includes('Mysterious')
  );
  const ultimateTreasure = currentData.filter(item => 
    item.option === 'ULTIMATE TREASURE'
  );

  const renderPrizeSection = (title: string, prizes: WheelData[], icon: React.ReactNode, bgColor: string) => (
    <div className={`${bgColor} backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <span className="text-sm text-gray-300">({prizes.length} items)</span>
      </div>
      <div className="grid gap-3">
        {prizes.map((item, globalIndex) => {
          const index = currentData.findIndex(dataItem => dataItem.option === item.option);
          // Use original chance for display, but show effective chance (0% when out of stock)
          const displayChance = item.amount === 0 ? 0 : item.chance;
          const originalChance = item.chance;
          
          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                item.amount === 0 
                  ? 'bg-red-500/10 border border-red-500/30' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {/* Prize Image and Option Name Image Display */}
              <div className="flex gap-2 flex-shrink-0">
                {/* Prize Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 relative group border-2 border-white/20">
                  <img 
                    src={item.image_url} 
                    alt={`${item.option} - Prize`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallbackDiv = target.nextElementSibling as HTMLElement;
                      if (fallbackDiv) {
                        fallbackDiv.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center hidden absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    {getPrizeIcon(item.option)}
                  </div>
                </div>

                {/* Option Name Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 relative group border-2 border-amber-400/30">
                  <img 
                    src={item.option_url} 
                    alt={`${item.option} - Name`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallbackDiv = target.nextElementSibling as HTMLElement;
                      if (fallbackDiv) {
                        fallbackDiv.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center hidden absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                    <Image className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>
              
              {!isEditing ? (
                <>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className={`text-base font-semibold ${item.amount === 0 ? 'text-red-400' : 'text-white'}`}>
                        {item.option}
                      </h5>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        item.amount === 0 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : item.amount <= 2
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        <Package className="w-3 h-3" />
                        {item.amount === 0 ? 'Out of Stock' : `${item.amount} left`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.amount === 0 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : 'bg-gradient-to-r from-green-400 to-blue-500'
                          }`}
                          style={{ width: `${Math.min((displayChance / Math.max(totalChance, 25)) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium w-10 ${
                        item.amount === 0 ? 'text-red-400' : 'text-gray-300'
                      }`}>
                        {displayChance}%
                        {item.amount === 0 && originalChance > 0 && (
                          <span className="text-xs text-gray-500 ml-1">({originalChance}%)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.option}
                      disabled={true}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium focus:outline-none focus:border-blue-400 text-sm"
                      placeholder="Prize name"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={originalChance}
                        onChange={(e) => handleChanceChange(index, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center font-medium focus:outline-none focus:border-blue-400 text-sm"
                      />
                      <div className="text-xs text-gray-400 mt-1">%</div>
                    </div>
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(index, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center font-medium focus:outline-none focus:border-blue-400 text-sm"
                      />
                      <div className="text-xs text-gray-400 mt-1">Stock</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{totalItems}</div>
            <div className="text-sm text-gray-300">Total Items</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-green-400">{availableItems}</div>
            <div className="text-sm text-gray-300">Available Prizes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-amber-400">{totalChance}%</div>
            <div className="text-sm text-gray-300">Active Probability</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-purple-400">{currentData.length}</div>
            <div className="text-sm text-gray-300">Prize Types</div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">Prize Management</h3>
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleResetStock}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset Stock
                  </button>
                  <button
                    onClick={handleEditStart}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                    Edit Prizes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 font-medium">
                Total Probability: {totalChance}% | Total Items: {totalItems}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Note: Items with 0 stock automatically have 0% chance in the wheel
              </p>
            </div>
          )}
        </div>

        {/* Prize Categories */}
        <div className="space-y-6 mb-8">
          {/* Ultimate Treasure */}
          {ultimateTreasure.length > 0 && renderPrizeSection(
            "Ultimate Treasure", 
            ultimateTreasure, 
            <Crown className="w-6 h-6 text-yellow-400" />,
            "bg-gradient-to-r from-yellow-500/20 to-orange-500/20"
          )}

          {/* Brand Sponsors */}
          {brandSponsors.length > 0 && renderPrizeSection(
            "Brand Sponsors", 
            brandSponsors, 
            <Gift className="w-6 h-6 text-blue-400" />,
            "bg-blue-500/10"
          )}

          {/* Mysterious Prizes */}
          {mysteriousPrizes.length > 0 && renderPrizeSection(
            "Mysterious Prizes", 
            mysteriousPrizes, 
            <Gem className="w-6 h-6 text-purple-400" />,
            "bg-purple-500/10"
          )}
        </div>

        {/* Navigation Button */}
        <div className="text-center">
          <button
            onClick={onNavigateToRoulette}
            disabled={isEditing || data.length === 0 || availableItems === 0}
            className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
          >
            <div className="relative z-10 flex items-center gap-3">
              <Play className="w-6 h-6" />
              {isEditing 
                ? 'Save Changes First' 
                : data.length === 0 
                ? 'Add Prizes First' 
                : availableItems === 0
                ? 'No Items Available'
                : 'Go to Roulette'}
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinningChancesPage;