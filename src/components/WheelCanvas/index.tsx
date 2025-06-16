import React, { createRef, RefObject, useEffect } from 'react';

import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp, getQuantity } from '../../utils';

interface WheelCanvasProps extends DrawWheelProps {
  width: string;
  height: string;
  data: WheelData[];
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

const drawCenterIcon = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
) => {
  // Draw center circle background
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#1f2937'; // Dark gray background
  ctx.fill();
  
  // Add border to center circle
  ctx.strokeStyle = '#f59e0b'; // Amber border
  ctx.lineWidth = 4;
  ctx.stroke();

  // Draw treasure chest icon (simplified)
  const iconSize = radius * 0.6;
  
  // Save context for icon drawing
  ctx.save();
  
  // Set icon color
  ctx.fillStyle = '#fbbf24'; // Amber color
  ctx.strokeStyle = '#d97706'; // Darker amber for outlines
  ctx.lineWidth = 2;
  
  // Draw treasure chest base
  const chestWidth = iconSize * 0.8;
  const chestHeight = iconSize * 0.6;
  const chestX = centerX - chestWidth / 2;
  const chestY = centerY - chestHeight / 2 + iconSize * 0.1;
  
  // Chest body
  ctx.fillRect(chestX, chestY, chestWidth, chestHeight);
  ctx.strokeRect(chestX, chestY, chestWidth, chestHeight);
  
  // Chest lid
  const lidHeight = chestHeight * 0.3;
  ctx.fillRect(chestX, chestY - lidHeight * 0.5, chestWidth, lidHeight);
  ctx.strokeRect(chestX, chestY - lidHeight * 0.5, chestWidth, lidHeight);
  
  // Chest lock
  const lockSize = iconSize * 0.15;
  ctx.beginPath();
  ctx.arc(centerX, chestY + chestHeight * 0.3, lockSize, 0, 2 * Math.PI);
  ctx.fillStyle = '#92400e'; // Dark brown for lock
  ctx.fill();
  ctx.stroke();
  
  // Lock keyhole
  ctx.beginPath();
  ctx.arc(centerX, chestY + chestHeight * 0.3, lockSize * 0.3, 0, 2 * Math.PI);
  ctx.fillStyle = '#1f2937'; // Dark keyhole
  ctx.fill();
  
  // Add some sparkle effects around the chest
  ctx.fillStyle = '#fef3c7'; // Light yellow for sparkles
  const sparkles = [
    { x: centerX - iconSize * 0.4, y: centerY - iconSize * 0.3, size: 3 },
    { x: centerX + iconSize * 0.4, y: centerY - iconSize * 0.2, size: 2 },
    { x: centerX - iconSize * 0.3, y: centerY + iconSize * 0.4, size: 2 },
    { x: centerX + iconSize * 0.3, y: centerY + iconSize * 0.3, size: 3 },
  ];
  
  sparkles.forEach(sparkle => {
    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, 2 * Math.PI);
    ctx.fill();
  });
  
  // Restore context
  ctx.restore();
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

    let startAngle = 0;
    const outsideRadius = canvas.width / 2 - 10;

    const clampedContentDistance = clamp(0, 100, textDistance);
    const contentRadius = (outsideRadius * clampedContentDistance) / 100;

    const clampedInsideRadius = clamp(0, 100, innerRadius);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < data.length; i++) {
      const { optionSize, style } = data[i];

      const arc =
        (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
        (2 * Math.PI) / QUANTITY;
      const endAngle = startAngle + arc;

      ctx.fillStyle = (style && style.backgroundColor) as string;

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
        // CASE TEXT
        contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
        ctx.rotate(contentRotationAngle);

        const text = data[i].option;
        ctx.font = `${style?.fontStyle || fontStyle} ${
          style?.fontWeight || fontWeight
        } ${(style?.fontSize || fontSize) * 2}px ${
          style?.fontFamily || fontFamily
        }, Helvetica, Arial`;
        ctx.fillStyle = (style && style.textColor) as string;
        ctx.fillText(
          text || '',
          -ctx.measureText(text || '').width / 2,
          fontSize / 2.7
        );
      }

      ctx.restore();

      startAngle = endAngle;
    }

    // Draw center icon after all wheel segments
    const centerIconRadius = Math.max(insideRadius * 0.8, 30); // Ensure minimum size
    drawCenterIcon(ctx, centerX, centerY, centerIconRadius);
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

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />;
};

export default WheelCanvas;