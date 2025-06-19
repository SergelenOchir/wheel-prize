export interface WheelData {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  chance: number;
  image_url: string;
  amount: number; // New field for product quantity
}