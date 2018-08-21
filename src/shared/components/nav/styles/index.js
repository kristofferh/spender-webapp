import styled from "react-emotion";
import { Link } from "react-router-dom";

import { fontSizeSubhead } from "shared/utils/styles";
import { minWidthMd } from "shared/utils/styles/layout";
import { white } from "shared/utils/styles/colors";
import { zIndex10 } from "shared/utils/styles/z-index";

export const Container = styled.nav`
  display: none;

  @media (min-width: ${minWidthMd}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: ${white};
    box-shadow: rgba(17, 17, 17, 0.1) 0 2px 5px;
    padding: 1rem 2rem;
    z-index: ${zIndex10};
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
