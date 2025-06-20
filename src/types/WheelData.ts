export interface WheelData {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  chance: number;
  image_url: string;
  option_url: string; // New field for option name images
  amount: number; // New field for product quantity
}