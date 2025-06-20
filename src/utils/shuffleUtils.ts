/**
 * Fisher-Yates shuffle algorithm to randomly shuffle an array
 * @param array - The array to shuffle
 * @returns A new shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Shuffle wheel data while maintaining color alternation pattern
 * @param data - The wheel data to shuffle
 * @returns Shuffled wheel data with alternating colors
 */
export const shuffleWheelData = <T extends { style: { backgroundColor: string } }>(data: T[]): T[] => {
  const shuffled = shuffleArray(data);
  const colors = ['#723E00', '#A4580C']; // Brown alternating colors
  
  // Apply alternating colors to maintain visual consistency
  return shuffled.map((item, index) => ({
    ...item,
    style: {
      ...item.style,
      backgroundColor: item.option === 'ULTIMATE TREASURE' 
        ? '#DC2626' // Keep red for Ultimate Treasure
        : colors[index % colors.length]
    }
  }));
};

/**
 * Shuffle only available items (items with amount > 0)
 * @param data - The wheel data to shuffle
 * @returns Shuffled data with available items mixed
 */
export const shuffleAvailableItems = <T extends { amount: number; style: { backgroundColor: string } }>(data: T[]): T[] => {
  const availableItems = data.filter(item => item.amount > 0);
  const unavailableItems = data.filter(item => item.amount === 0);
  
  const shuffledAvailable = shuffleWheelData(availableItems);
  const shuffledUnavailable = shuffleArray(unavailableItems);
  
  return [...shuffledAvailable, ...shuffledUnavailable];
};