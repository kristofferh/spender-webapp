import styled from "@emotion/styled";
import { ProgressButton } from "shared/components/progress-button";
import {
  boldText,
  borderRadiusSubtle,
  danger,
  fontSizeSubhead,
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
`;

export const PrimaryBtn = styled(ProgressButton)`
  margin-left: auto;
  order: 1;
  display: inline-flex;
  width: auto;
  padding: 0 40px;
`;

export const TextLink = styled.a`
  font-size: ${fontSizeSubhead};
  cursor: pointer;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
`;
