import styled from "@emotion/styled";
import { darkGray, fontSizeCaptionTwo, white } from "shared/utils/styles";

export const Container = styled.span<{ bgColor?: string }>`
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

export const RemoveContainer = styled.span`
  margin-left: -4px;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
`;

export const Remove = styled.button`
  padding: 0;
  cursor: pointer;
  appearance: none;
  border: 0;
  background: transparent;

  &:focus {
    outline: 2px solid rgb(255, 255, 0);
  }
`;
