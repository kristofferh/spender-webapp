import styled from "@emotion/styled";
import {
  fontSizeSubhead,
  danger,
  borderRadiusSubtle,
  boldText,
  white
} from "shared/utils/styles";

export const Container = styled.footer``;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorContainer = styled.div`
  ${boldText()};
  margin: 0 0 10px;
  padding: 5px 10px;
  background: ${danger};
  border-radius: ${borderRadiusSubtle};
  color: ${white};
  text-decoration: underline;
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
