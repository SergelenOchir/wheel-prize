import React, { useState, useRef } from 'react';
import { Edit3, Save, X, Trash2, Plus, Link, Upload, Image, Play, ArrowRight } from 'lucide-react';
import { WheelData } from '../types/WheelData';
import { getPrizeIcon } from '../utils/prizeIcons';

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
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [imageInputMethod, setImageInputMethod] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditStart = () => {
    setTempData([...data]);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setTempData([]);
    setIsEditing(false);
    setEditingImageIndex(null);
    setImageInputMethod('url');
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
    setEditingImageIndex(null);
    setImageInputMethod('url');
  };

  const handleChanceChange = (index: number, newChance: number) => {
    const updatedData = [...tempData];
    updatedData[index] = { ...updatedData[index], chance: Math.max(0, newChance) };
    setTempData(updatedData);
  };

  const handleOptionChange = (index: number, newOption: string) => {
    const updatedData = [...tempData];
    updatedData[index] = { ...updatedData[index], option: newOption };
    setTempData(updatedData);
  };

  const handleImageChange = (index: number, newImage: string) => {
    const updatedData = [...tempData];
    updatedData[index] = { ...updatedData[index], image_url: newImage };
    setTempData(updatedData);
  };

  const handleImageEdit = (index: number) => {
    setEditingImageIndex(index);
    setImageInputMethod('url');
  };

  const handleImageEditClose = () => {
    setEditingImageIndex(null);
    setImageInputMethod('url');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingImageIndex !== null) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleImageChange(editingImageIndex, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
      image_url: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    setTempData([...tempData, newItem]);
  };

  const currentData = isEditing ? tempData : data;
  const totalChance = currentData.reduce((sum, item) => sum + item.chance, 0);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Configure Winning Chances
          </h1>
          <p className="text-xl text-gray-300">Set up your prizes and their winning probabilities</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">Prize Configuration</h3>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEditStart}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Prizes
                </button>
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
                Total Probability: {totalChance}% | Edit prizes, chances, and images
              </p>
            </div>
          )}

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {currentData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white/10 relative group">
                  <img 
                    src={item.image_url} 
                    alt={item.option}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center hidden">
                    {getPrizeIcon(item.option)}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleImageEdit(index)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Edit3 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
                
                {!isEditing ? (
                  <>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{item.option}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((item.chance / Math.max(totalChance, 25)) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-300 w-12">{item.chance}%</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={item.option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium focus:outline-none focus:border-blue-400"
                        placeholder="Prize name"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.chance}
                        onChange={(e) => handleChanceChange(index, parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center font-medium focus:outline-none focus:border-blue-400"
                      />
                      <span className="text-sm text-gray-300 font-medium">%</span>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Remove this prize"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <button
              onClick={handleAddItem}
              className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl text-white font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Prize
            </button>
          )}
        </div>

        {/* Navigation Button */}
        <div className="text-center">
          <button
            onClick={onNavigateToRoulette}
            disabled={isEditing || data.length === 0}
            className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
          >
            <div className="relative z-10 flex items-center gap-3">
              <Play className="w-6 h-6" />
              {isEditing ? 'Save Changes First' : data.length === 0 ? 'Add Prizes First' : 'Go to Roulette'}
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      {/* Image Edit Modal */}
      {editingImageIndex !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Edit Image</h3>
              <button
                onClick={handleImageEditClose}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Current Image Preview */}
              <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5">
                <img 
                  src={tempData[editingImageIndex]?.image_url} 
                  alt="Current"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-full h-full flex items-center justify-center hidden text-gray-400">
                  <Image className="w-8 h-8" />
                </div>
              </div>

              {/* Method Selection */}
              <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                <button
                  onClick={() => setImageInputMethod('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    imageInputMethod === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Link className="w-4 h-4" />
                  URL
                </button>
                <button
                  onClick={() => setImageInputMethod('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    imageInputMethod === 'upload'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {/* URL Input */}
              {imageInputMethod === 'url' && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={tempData[editingImageIndex]?.image_url || ''}
                    onChange={(e) => handleImageChange(editingImageIndex, e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-400">
                    Enter a direct link to an image (JPG, PNG, GIF, WebP)
                  </p>
                </div>
              )}

              {/* File Upload */}
              {imageInputMethod === 'upload' && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={handleUploadClick}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/20 hover:border-white/40 rounded-lg text-white transition-colors"
                  >
                    <Image className="w-5 h-5" />
                    Choose Image File
                  </button>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>
              )}

              {/* Action Button */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleImageEditClose}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinningChancesPage;