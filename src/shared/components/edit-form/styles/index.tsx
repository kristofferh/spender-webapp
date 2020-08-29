import styled from "@emotion/styled";
import { mainContent, maxWidthMd } from "shared/utils/styles";

export const Form = styled.form`
  ${mainContent()};
  width: auto;

  @media (max-width: ${maxWidthMd}) {
    margin: 0 -16px;
    padding: 16px;
  }
`;

export const FormGroup = styled.div`
  display: block;
  margin-bottom: 16px;
  position: relative;
`;

export const ToggleButton = styled.button`
  border: 0;
  position: absolute;
  right: 2px;
  top: 30px;
  background: transparent;
  padding: 0;
  appearance: none;

  &:focus {
    outline: none;
  }
`;
