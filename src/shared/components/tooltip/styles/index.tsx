import { css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import rgba from "polished/lib/color/rgba";
import { space, white } from "shared/utils/styles";

const offset = "8px";

const top = keyframes`
  0% {
    transform: translateY(-${offset});
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const right = keyframes`
  0% {
    transform: translateX(${offset});
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const bottom = keyframes`
  0% {
    transform: translateY(${offset});
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const left = keyframes`
  0% {
    transform: translateX(-${offset});
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Anchor = styled.span`
  display: inline-block;

  *[disabled] {
    pointer-events: none;
  }
`;

export const Content = styled.span<{ animationDirection: string }>`
  padding: 8px;
  border-radius: 4px;
  background: ${space};
  color: ${white};
  box-shadow: 0 2px 3px ${rgba(space, 0.1)};
  display: inline-flex;
  position: absolute;
  opacity: 0;

  ${({ animationDirection }) => {
    if (animationDirection === "left") {
      return css`
        animation: ${left} 0.25s ease-in-out forwards;
      `;
    } else if (animationDirection === "right") {
      return css`
        animation: ${right} 0.25s ease-in-out forwards;
      `;
    } else if (animationDirection === "bottom") {
      return css`
        animation: ${bottom} 0.25s ease-in-out forwards;
      `;
    } else {
      return css`
        animation: ${top} 0.25s ease-in-out forwards;
      `;
    }
  }}
`;
