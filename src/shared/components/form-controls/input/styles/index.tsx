import styled from "@emotion/styled";
import { error, flatInput } from "shared/utils/styles";

export const StyledInput = styled.input<{ hasError?: boolean }>`
  ${flatInput()};
  border-bottom-color: ${({ hasError }) => (hasError ? error : "inherit")};
`;
