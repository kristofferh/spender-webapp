import styled from "@emotion/styled";

import { fontSizeCaptionTwo, white, darkGray } from "shared/utils/styles";

export const Container = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  background: ${({ bgColor }) => (bgColor ? bgColor : darkGray)};
  border-radius: 2px;
  color: ${white};
  margin-right: 4px;
  font-size: ${fontSizeCaptionTwo};
  font-weight: bold;
  white-space: nowrap;
  max-width: 100%;
`;

export const Inner = styled.span`
  padding: 4px 7px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Remove = styled.span`
  margin-left: -4px;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
`;
