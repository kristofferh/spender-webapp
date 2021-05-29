import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { white, zIndex10 } from "shared/utils/styles";

type Direction = "ltr" | "rtl" | undefined;

type ContainerProps = {
  slideDirection?: Direction;
  show?: boolean;
  maxWidth?: number | string;
};

const slideIn = (direction: Direction) => keyframes`
  0% {
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.3);
    transform: translateX(${direction === "rtl" ? "60%" : "-100%"});
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  99% {
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.3);
  }
  100% {
    box-shadow: none;
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = (direction: Direction) => keyframes`
  0% {
    transform: translateX(0);
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.3);
  }

  90% {
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.3);
  }

  100% {
    transform: translateX(${direction === "rtl" ? "100%" : "-100%"});
    box-shadow: none;
  }
`;

export const Container = styled.aside<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform: ${({ slideDirection }) =>
    slideDirection === "rtl" ? "translateX(100%)" : "translate(-100%)"};
  z-index: ${zIndex10};
  background: ${white};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  display: flex;
  flex-direction: column;
  ${({ show, slideDirection }) =>
    show
      ? css`
          animation: ${slideIn(slideDirection)} 0.25s ease-in-out forwards;
        `
      : css`
          animation: ${slideOut(slideDirection)} 0.25s ease-in-out forwards;
        `};
`;
