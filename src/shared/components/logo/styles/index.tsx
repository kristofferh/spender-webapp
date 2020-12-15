import styled from "@emotion/styled";
import { fontFamilySerifSemiboldHeadline, white } from "shared/utils/styles";

export const Container = styled.span`
  color: ${({ color }) => (color ? color : white)};
  font-family: ${fontFamilySerifSemiboldHeadline};
  font-size: 25px;
  margin: auto;
  padding: 0 25px;
`;
