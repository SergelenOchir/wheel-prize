import React, { createRef, RefObject, useEffect } from 'react';

import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp, getQuantity } from '../../utils';
import { getPrizeIcon } from '../../utils/prizeIcons';

interface WheelCanvasProps extends DrawWheelProps {
  width: string;
  height: string;
  data: WheelData[];
  centerIcon?: React.ReactNode;
}

interface DrawWheelProps {
  outerBorderColor: string;
  outerBorderWidth: number;
  innerRadius: number;
  innerBorderColor: string;
  innerBorderWidth: number;
  radiusLineColor: string;
  radiusLineWidth: number;
  fontFamily: string;
  fontWeight: number | string;
  fontSize: number;
  fontStyle: string;
  perpendicularText: boolean;
  prizeMap: number[][];
  rouletteUpdater: boolean;
  textDistance: number;
}

const drawRadialBorder = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  insideRadius: number,
  outsideRadius: number,
  angle: number
) => {
  ctx.beginPath();
  ctx.moveTo(
    centerX + (insideRadius + 1) * Math.cos(angle),
    centerY + (insideRadius + 1) * Math.sin(angle)
  );
  ctx.lineTo(
    centerX + (outsideRadius - 1) * Math.cos(angle),
    centerY + (outsideRadius - 1) * Math.sin(angle)
  );
  ctx.closePath();
  ctx.stroke();
};

// Helper function to create SVG icon as canvas image
const createIconCanvas = (iconType: string, size: number = 32) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  
  if (!ctx) return canvas;
  
  // Set icon color to white
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  const center = size / 2;
  const scale = size / 24; // Scale factor for 24x24 icons
  
  // Draw different icons based on type
  switch (iconType) {
    case 'gift':
      // Gift box icon
      ctx.fillRect(center - 8 * scale, center - 4 * scale, 16 * scale, 12 * scale);
      ctx.fillRect(center - 10 * scale, center - 6 * scale, 20 * scale, 4 * scale);
      ctx.fillRect(center - 2 * scale, center - 6 * scale, 4 * scale, 14 * scale);
      ctx.fillRect(center - 10 * scale, center - 2 * scale, 20 * scale, 4 * scale);
      break;
    case 'crown':
      // Crown icon
      ctx.beginPath();
      ctx.moveTo(center - 10 * scale, center + 6 * scale);
      ctx.lineTo(center - 8 * scale, center - 2 * scale);
      ctx.lineTo(center - 4 * scale, center + 2 * scale);
      ctx.lineTo(center, center - 6 * scale);
      ctx.lineTo(center + 4 * scale, center + 2 * scale);
      ctx.lineTo(center + 8 * scale, center - 2 * scale);
      ctx.lineTo(center + 10 * scale, center + 6 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'star':
      // Star icon
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 144 - 90) * Math.PI / 180;
        const x = center + Math.cos(angle) * 8 * scale;
        const y = center + Math.sin(angle) * 8 * scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        
        const innerAngle = ((i + 0.5) * 144 - 90) * Math.PI / 180;
        const innerX = center + Math.cos(innerAngle) * 4 * scale;
        const innerY = center + Math.sin(innerAngle) * 4 * scale;
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
      break;
    case 'gem':
      // Diamond/Gem icon
      ctx.beginPath();
      ctx.moveTo(center, center - 8 * scale);
      ctx.lineTo(center - 6 * scale, center - 2 * scale);
      ctx.lineTo(center - 4 * scale, center + 6 * scale);
      ctx.lineTo(center + 4 * scale, center + 6 * scale);
      ctx.lineTo(center + 6 * scale, center - 2 * scale);
      ctx.closePath();
      ctx.fill();
      break;
    case 'trophy':
      // Trophy icon
      ctx.fillRect(center - 3 * scale, center + 2 * scale, 6 * scale, 6 * scale);
      ctx.fillRect(center - 6 * scale, center - 6 * scale, 12 * scale, 8 * scale);
      ctx.fillRect(center - 2 * scale, center - 8 * scale, 4 * scale, 4 * scale);
      break;
    default:
      // Default gift icon
      ctx.fillRect(center - 8 * scale, center - 4 * scale, 16 * scale, 12 * scale);
      ctx.fillRect(center - 10 * scale, center - 6 * scale, 20 * scale, 4 * scale);
      ctx.fillRect(center - 2 * scale, center - 6 * scale, 4 * scale, 14 * scale);
      ctx.fillRect(center - 10 * scale, center - 2 * scale, 20 * scale, 4 * scale);
  }
  
  return canvas;
};

const getIconTypeForPrize = (prizeName: string): string => {
  if (prizeName === 'ULTIMATE TREASURE') return 'crown';
  if (prizeName.includes('Mysterious Prize')) return 'gem';
  if (prizeName.includes('Jackpot')) return 'trophy';
  if (prizeName.includes('Lucky') || prizeName.includes('Star')) return 'star';
  return 'gift';
};

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[],
  drawWheelProps: DrawWheelProps
) => {
  /* eslint-disable prefer-const */
  let {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontFamily,
    fontWeight,
    fontSize,
    fontStyle,
    perpendicularText,
    prizeMap,
    textDistance,
  } = drawWheelProps;

  const QUANTITY = getQuantity(prizeMap);

  outerBorderWidth *= 2;
  innerBorderWidth *= 2;
  radiusLineWidth *= 2;

  const canvas = canvasRef.current;
  if (canvas?.getContext('2d')) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;

    let startAngle = -Math.PI / 2;
    const outsideRadius = canvas.width / 2 - 10;

    const clampedContentDistance = clamp(0, 100, textDistance);
    const contentRadius = (outsideRadius * clampedContentDistance) / 100;

    const clampedInsideRadius = clamp(0, 100, innerRadius);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < data.length; i++) {
      const { optionSize, style, option } = data[i];

      const arc =
        (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
        (2 * Math.PI) / QUANTITY;
      const endAngle = startAngle + arc;

      // Special red gradient handling for Ultimate Treasure
      if (option === 'ULTIMATE TREASURE') {
        const gradient = ctx.createRadialGradient(centerX, centerY, insideRadius, centerX, centerY, outsideRadius);
        gradient.addColorStop(0, '#EF4444'); // Lighter red
        gradient.addColorStop(1, '#DC2626'); // Darker red
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = (style && style.backgroundColor) as string;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();

      // WHEEL RADIUS LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      ctx.lineWidth = radiusLineWidth;
      drawRadialBorder(
        ctx,
        centerX,
        centerY,
        insideRadius,
        outsideRadius,
        startAngle
      );
      if (i === data.length - 1) {
        drawRadialBorder(
          ctx,
          centerX,
          centerY,
          insideRadius,
          outsideRadius,
          endAngle
        );
      }

      // WHEEL OUTER BORDER
      ctx.strokeStyle =
        outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // WHEEL INNER BORDER
      ctx.strokeStyle =
        innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      ctx.lineWidth = innerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        insideRadius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // CONTENT FILL
      ctx.translate(
        centerX + Math.cos(startAngle + arc / 2) * contentRadius,
        centerY + Math.sin(startAngle + arc / 2) * contentRadius
      );
      let contentRotationAngle = startAngle + arc / 2;

      if (data[i].image) {
        // CASE IMAGE
        contentRotationAngle +=
          data[i].image && !data[i].image?.landscape ? Math.PI / 2 : 0;
        ctx.rotate(contentRotationAngle);

        const img = data[i].image?._imageHTML || new Image();
        ctx.drawImage(
          img,
          (img.width + (data[i].image?.offsetX || 0)) / -2,
          -(
            img.height -
            (data[i].image?.landscape ? 0 : 90) + // offsetY correction for non landscape images
            (data[i].image?.offsetY || 0)
          ) / 2,
          img.width,
          img.height
        );
      } else {
        // CASE TEXT WITH ICON
        contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
        ctx.rotate(contentRotationAngle);

        const text = data[i].option;
        const iconType = getIconTypeForPrize(text || '');
        
        // Create and draw icon
        const iconSize = Math.min(32, fontSize * 1.5);
        const iconCanvas = createIconCanvas(iconType, iconSize);
        
        // Draw icon above text
        ctx.drawImage(
          iconCanvas,
          -iconSize / 2,
          -fontSize * 1.5 - iconSize / 2
        );
        
        // Draw text below icon
        ctx.font = `${style?.fontStyle || fontStyle} ${
          style?.fontWeight || fontWeight
        } ${(style?.fontSize || fontSize) * 2}px ${
          style?.fontFamily || fontFamily
        }, Helvetica, Arial`;
        ctx.fillStyle = (style && style.textColor) as string;
        ctx.fillText(
          text || '',
          -ctx.measureText(text || '').width / 2,
          fontSize / 2.7 + iconSize / 2
        );
      }

      ctx.restore();

      startAngle = endAngle;
    }
  }
};

const WheelCanvas = ({
  width,
  height,
  data,
  outerBorderColor,
  outerBorderWidth,
  innerRadius,
  innerBorderColor,
  innerBorderWidth,
  radiusLineColor,
  radiusLineWidth,
  fontFamily,
  fontWeight,
  fontSize,
  fontStyle,
  perpendicularText,
  prizeMap,
  rouletteUpdater,
  textDistance,
  centerIcon,
}: WheelCanvasProps): JSX.Element => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const drawWheelProps = {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontFamily,
    fontWeight,
    fontSize,
    fontStyle,
    perpendicularText,
    prizeMap,
    rouletteUpdater,
    textDistance,
  };

  useEffect(() => {
    drawWheel(canvasRef, data, drawWheelProps);
  }, [canvasRef, data, drawWheelProps, rouletteUpdater]);

  return (
    <div className="relative">
      <WheelCanvasStyle ref={canvasRef} width={width} height={height} />
      {/* Center Icon Overlay */}
      {centerIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          {centerIcon}
        </div>
      )}
    </div>
  );
};

export default WheelCanvas;