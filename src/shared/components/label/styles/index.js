import styled from "@emotion/styled";

import { fontSizeCaptionTwo, white, darkGray } from "shared/utils/styles";

export const Container = styled.span`
  text-transform: uppercase;
  background: ${({ bgColor }) => (bgColor ? bgColor : darkGray)};
  padding: 4px 7px 5px;
  border-radius: 2px;
  color: ${white};
  margin-right: 4px;
  font-size: ${fontSizeCaptionTwo};
  font-weight: bold;
`;
