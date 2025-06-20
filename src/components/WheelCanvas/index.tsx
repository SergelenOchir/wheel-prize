import React, { createRef, RefObject, useEffect } from 'react';

import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp, getQuantity } from '../../utils';

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

// Cache for loaded images
const imageCache = new Map<string, HTMLImageElement>();

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve(imageCache.get(src)!);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
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

    // Pre-load all images (both prize images and option name images)
    const imagePromises = data.map(item => {
      const promises = [];
      
      // Load option name image
      if (item.option_url) {
        promises.push(loadImage(item.option_url).catch(() => null));
      } else {
        promises.push(Promise.resolve(null));
      }
      
      return Promise.all(promises);
    });

    Promise.all(imagePromises).then(loadedImagePairs => {
      // Clear canvas again before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let currentStartAngle = -Math.PI / 2;

      for (let i = 0; i < data.length; i++) {
        const { optionSize, style, option } = data[i];

        const arc =
          (optionSize && (optionSize * (3 * Math.PI)) / QUANTITY) ||
          (2 * Math.PI) / QUANTITY;
        const endAngle = currentStartAngle + arc;

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
        ctx.arc(centerX, centerY, outsideRadius, currentStartAngle, endAngle, false);
        ctx.arc(centerX, centerY, insideRadius, endAngle, currentStartAngle, true);
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
          currentStartAngle
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

        // CONTENT FILL - DISPLAY IMAGES
        ctx.translate(
          centerX + Math.cos(currentStartAngle + arc / 2) * contentRadius,
          centerY + Math.sin(currentStartAngle + arc / 2) * contentRadius
        );
        let contentRotationAngle = currentStartAngle + arc / 2;

        if (data[i].image) {
          // CASE IMAGE (existing image handling for backward compatibility)
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
          // CASE PRIZE IMAGE AND OPTION NAME IMAGE
          ctx.rotate(contentRotationAngle);

          const [prizeImage, optionNameImage] = loadedImagePairs[i] || [null, null];
          
          if (prizeImage && optionNameImage) {
            // Calculate segment dimensions
            const segmentWidth = (outsideRadius - insideRadius) * 0.8;
            const maxImageSize = Math.min(80, segmentWidth * 0.6);
            
            // Draw prize image (smaller, positioned towards outer edge)
            const prizeAspectRatio = prizeImage.naturalWidth / prizeImage.naturalHeight;
            let prizeWidth = maxImageSize * 0.7;
            let prizeHeight = maxImageSize * 0.7;
            
            if (prizeAspectRatio > 1) {
              prizeHeight = prizeWidth / prizeAspectRatio;
            } else {
              prizeWidth = prizeHeight * prizeAspectRatio;
            }
            
            // Position prize image towards outer edge
            const prizeOffset = segmentWidth * 0.15;
            ctx.drawImage(
              prizeImage,
              -prizeWidth / 2,
              -prizeHeight / 2 - prizeOffset,
              prizeWidth,
              prizeHeight
            );
            
            // Draw option name image (larger, positioned towards inner edge) - INCREASED SIZE
            const optionAspectRatio = optionNameImage.naturalWidth / optionNameImage.naturalHeight;
            let optionWidth = maxImageSize * 1.2; // Increased from maxImageSize to maxImageSize * 1.2
            let optionHeight = maxImageSize * 0.5; // Increased from maxImageSize * 0.4 to maxImageSize * 0.5
            
            if (optionAspectRatio > 1) {
              optionHeight = optionWidth / optionAspectRatio;
            } else {
              optionWidth = optionHeight * optionAspectRatio;
            }
            
            // Position option name towards inner edge
            const optionOffset = segmentWidth * 0.15;
            ctx.drawImage(
              optionNameImage,
              -optionWidth / 2,
              -optionHeight / 2 + optionOffset,
              optionWidth,
              optionHeight
            );
            
          } else if (prizeImage) {
            // Only prize image available
            const aspectRatio = prizeImage.naturalWidth / prizeImage.naturalHeight;
            const segmentWidth = (outsideRadius - insideRadius) * 0.8;
            const maxImageSize = Math.min(100, segmentWidth);
            
            let drawWidth = maxImageSize;
            let drawHeight = maxImageSize;
            
            if (aspectRatio > 1) {
              drawHeight = maxImageSize / aspectRatio;
            } else {
              drawWidth = maxImageSize * aspectRatio;
            }
            
            ctx.drawImage(
              prizeImage,
              -drawWidth / 2,
              -drawHeight / 2,
              drawWidth,
              drawHeight
            );
          } else if (optionNameImage) {
            // Only option name image available - INCREASED SIZE
            const aspectRatio = optionNameImage.naturalWidth / optionNameImage.naturalHeight;
            const segmentWidth = (outsideRadius - insideRadius) * 0.8;
            const maxImageSize = Math.min(100, segmentWidth);
            
            let drawWidth = maxImageSize * 1.2; // Increased from maxImageSize to maxImageSize * 1.2
            let drawHeight = maxImageSize * 0.5; // Increased from maxImageSize * 0.4 to maxImageSize * 0.5
            
            if (aspectRatio > 1) {
              drawHeight = drawWidth / aspectRatio;
            } else {
              drawWidth = drawHeight * aspectRatio;
            }
            
            ctx.drawImage(
              optionNameImage,
              -drawWidth / 2,
              -drawHeight / 2,
              drawWidth,
              drawHeight
            );
          } else {
            // Fallback to text if both images fail to load
            const text = data[i].option;
            ctx.font = `${style?.fontStyle || fontStyle} ${
              style?.fontWeight || fontWeight
            } ${(style?.fontSize || fontSize) * 1.2}px ${
              style?.fontFamily || fontFamily
            }, Helvetica, Arial`;
            ctx.fillStyle = (style && style.textColor) as string;
            
            // Multi-line text handling for long names
            const words = text.split(' ');
            const maxWidth = (outsideRadius - insideRadius) * 1.2;
            let lines = [];
            let currentLine = words[0];

            for (let j = 1; j < words.length; j++) {
              const testLine = currentLine + ' ' + words[j];
              const metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = words[j];
              } else {
                currentLine = testLine;
              }
            }
            lines.push(currentLine);

            // Draw each line
            const lineHeight = fontSize * 1.2;
            const totalHeight = lines.length * lineHeight;
            const startY = -totalHeight / 2 + lineHeight / 2;

            lines.forEach((line, index) => {
              ctx.fillText(
                line,
                -ctx.measureText(line).width / 2,
                startY + index * lineHeight
              );
            });
          }
        }

        ctx.restore();
        currentStartAngle = endAngle;
      }
    });
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