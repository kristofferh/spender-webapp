import styled from "@emotion/styled";
import { error, fontSizeFootnote, fontWeightBold } from "shared/utils/styles";

export type LabelProps = {
  required?: boolean;
};

export type WrapperProps = {
  hasError?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  color: ${({ hasError }) => (hasError ? error : "inherit")};
`;

export const LabelWrapper = styled.div``;

export const Label = styled.label<LabelProps>`
  font-weight: bold;
  display: block;

  &:after {
    content: ${({ required }) => (required ? "'*'" : "''")};
  }
`;

export const Error = styled.span`
  font-weight: ${fontWeightBold};
  font-size: ${fontSizeFootnote};
  display: block;
  margin-top: 0.5rem;
`;
