import styled from 'styled-components';

import { NonDraggableImage } from '../common/styledComponents';

export const RouletteContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  flex-shrink: 0;
  z-index: 5;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RotationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${props => props.startRotationDegrees}deg);

  &.started-spinning {
    animation: spin-${({ classKey }) => classKey} ${({ startSpinningTime }) =>
          startSpinningTime / 1000}s cubic-bezier(
          0.71,
          ${props => (props.disableInitialAnimation ? 0 : -0.29)},
          0.96,
          0.9
        ) 0s 1 normal forwards running,
      continueSpin-${({ classKey }) => classKey} ${({ continueSpinningTime }) =>
          continueSpinningTime / 1000}s linear ${({ startSpinningTime }) =>
          startSpinningTime / 1000}s 1 normal forwards running,
      stopSpin-${({ classKey }) => classKey} ${({ stopSpinningTime }) =>
          stopSpinningTime / 1000}s cubic-bezier(0, 0, 0.35, 1.02) ${({
          startSpinningTime,
          continueSpinningTime,
        }) => (startSpinningTime + continueSpinningTime) / 1000}s 1 normal forwards
        running;
  }

  @keyframes spin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes continueSpin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes stopSpin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => 1440 + props.finalRotationDegrees}deg);
    }
  }
`;

export const RoulettePointerImage = styled(NonDraggableImage)`
  position: absolute;
  z-index: 10;
  width: 17%;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(-45%);
  transform-origin: center bottom;
  pointer-events: none;
`;