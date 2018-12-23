import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

import { hexToRGBA } from "shared/utils/colors";

import {
  fontSizeSubhead,
  minWidthMd,
  white,
  logan,
  zIndex10
} from "shared/utils/styles";

const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Container = styled.nav`
  width: 100%;
  background: ${logan};
  padding: 1rem;
  z-index: ${zIndex10};
  position: relative;
  border-bottom: 1px solid ${hexToRGBA(white, 0.1)};

  @media (min-width: ${minWidthMd}) {
    background: ${white};
    padding: 1rem 2rem;
    box-shadow: rgba(17, 17, 17, 0.1) 0 2px 5px;
    border-bottom: 0;
  }
`;

export const Add = styled(Link)`
  padding: 5px 25px;
  background: linear-gradient(156deg, #a6a8bc 59%, #c7b1ba 99%);
  text-decoration: none;
  color: ${white};
  border-radius: 100px;
  font-size: ${fontSizeSubhead};
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.5s ease;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  &:focus,
  &:hover {
    outline: none;
    filter: hue-rotate(300deg);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

export const Mobile = styled.div`
  ${flexContainer};
  @media (min-width: ${minWidthMd}) {
    display: none;
  }
`;

export const Desktop = styled.div`
  ${flexContainer};
  display: none;

  @media (min-width: ${minWidthMd}) {
    display: flex;
  }
`;
