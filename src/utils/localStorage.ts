import { WheelData } from '../types/WheelData';

const STORAGE_KEY = 'wheel_data';

export const saveWheelData = (data: WheelData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
};

export const loadWheelData = (): WheelData[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
    return null;
  }
};

export const clearWheelData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};