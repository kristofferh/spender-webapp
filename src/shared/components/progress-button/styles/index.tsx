import styled from "@emotion/styled";
import { outlineFormControl } from "shared/utils/styles";

export const Button = styled.button`
  width: 100%;
  border: 0;
  background-color: ${props =>
    props.disabled ? "rgba(0, 0, 0, 0.1)" : "#000"};
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${outlineFormControl};
  }
`;
