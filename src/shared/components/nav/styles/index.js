import styled from "@emotion/styled";

import { hexToRGBA } from "shared/utils/colors";

import { white, logan, zIndex10 } from "shared/utils/styles";

export const Container = styled.nav`
  width: 100%;
  background: ${logan};
  padding: 1rem;
  z-index: ${zIndex10};
  position: relative;
  border-bottom: 1px solid ${hexToRGBA(white, 0.1)};
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
