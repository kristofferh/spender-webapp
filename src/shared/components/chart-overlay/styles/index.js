import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";

import { logan } from "shared/utils/styles";

import { ArrowDown } from "shared/components/icons";

export const Overlay = styled.div`
  position: relative;
  min-height: 40px;
`;

export const Container = styled.div`
  height: ${({ height }) => `${height}px`};
  overflow: auto;
  transition: height 0.2s ease;
  padding: 0 0 40px;
`;

export const Toggle = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: 0;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  place-content: center;
  background: ${logan};
  box-shadow: ${({ active }) =>
    active ? "0 -1px 2px 1px rgba(0, 0, 0, 0.15)" : null};
  transition: box-shadow 0.2s ease;
`;

export const Arrow = styled(ArrowDown, { shouldForwardProp: isPropValid })`
  transform: ${({ active }) => (active ? "rotate(180deg)" : null)};
`;
