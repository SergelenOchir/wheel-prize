import { WEB_FONTS } from './strings';

export const getRotationDegrees = (
  prizeNumber: number,
  numberOfPrizes: number,
  randomDif = true
): number => {
  const degreesPerPrize = 360 / numberOfPrizes;

  // Adjust initial rotation for top pointer (0 degrees)
  // The pointer is at the top, so we need to account for this
  const initialRotation = degreesPerPrize / 2;

  const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;

  // Calculate rotation so the selected prize ends up under the top pointer
  const perfectRotation =
    degreesPerPrize * (numberOfPrizes - prizeNumber) - initialRotation;

  const imperfectRotation =
    degreesPerPrize * (numberOfPrizes - prizeNumber) -
    initialRotation +
    randomDifference;

  const prizeRotation = randomDif ? imperfectRotation : perfectRotation;

  // Ensure we get the right direction of rotation
  return numberOfPrizes - prizeNumber > numberOfPrizes / 2
    ? -360 + prizeRotation
    : prizeRotation;
};

export const clamp = (min: number, max: number, val: number): number =>
  Math.min(Math.max(min, +val), max);

export const isCustomFont = (font: string): boolean =>
  !!font && !WEB_FONTS.includes(font.toLowerCase());

export const getQuantity = (prizeMap: number[][]): number =>
  prizeMap.slice(-1)[0].slice(-1)[0] + 1;

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const makeClassKey = (length: number): string => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};