import styled from "@emotion/styled";
import { hexToRGBA } from "shared/utils/colors";
import {
  elevation,
  logan,
  white,
  zIndex1,
  zIndex10,
  zIndex2
} from "shared/utils/styles";

type PrimaryNavProps = {
  active?: boolean;
};

export const Container = styled.nav`
  width: 100%;
  z-index: ${zIndex10};
  position: relative;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  position: relative;
  z-index: ${zIndex2};
  background: ${logan};
  border-bottom: 1px solid ${hexToRGBA(white, 0.1)};
`;

export const MenuWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

export const PrimaryNav = styled.nav<PrimaryNavProps>`
  position: absolute;
  max-width: 400px;
  width: 90%;
  height: calc(100vh - 66px);
  min-width: 320px;
  transform: translateX(-100%);
  transition: transform 0.2s ease;
  background: ${white};
  z-index: ${zIndex1};
  top: 66px;
  bottom: 0;
  padding: 16px;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: 12px;
  ${({ active }) => (active ? `${elevation()} transform: translateX(0)` : null)}
`;
