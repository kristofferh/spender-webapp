import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

export const buttonSpin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: center center;
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
    transform-origin: center center;
  }
`;

export const LoaderOuterContainer = styled.div`
  vertical-align: middle;
  position: relative;
`;

export const Container = styled.div`
  margin: 10px auto;
  border: ${({ borderWidth }) => borderWidth}px solid
    ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  width: ${({ containerSize }) => containerSize}px;
  height: ${({ containerSize }) => containerSize}px;
`;

export const Circle = styled.svg`
  animation: ${buttonSpin} 0.9s infinite cubic-bezier(0.08, 0.03, 1, 1.04);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  left: 50%;
  top: 50%;
`;
