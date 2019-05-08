import styled from "@emotion/styled";
import { fontSizeSubhead } from "shared/utils/styles";

export const Container = styled.footer`
  display: flex;
  align-items: center;
`;

export const PrimaryBtn = styled.button`
  margin-left: auto;
  order: 1;
`;

export const TextLink = styled.a`
  font-size: ${fontSizeSubhead};
  cursor: pointer;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
`;
