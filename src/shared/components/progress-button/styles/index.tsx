import styled from "@emotion/styled";
import { black, outlineFormControl, space, white } from "shared/utils/styles";

interface ButtonProps {
  disabled?: boolean;
  state?: string;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  width: 100%;
  border: 0;
  background-color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.1)" : space};
  color: ${white};
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.3s ease;
  cursor: ${({ state }) => (state === "loading" ? "wait" : "pointer")};
  font-family: inherit;
  font-size: inherit;
  pointer-events: ${({ state }) => (state === "loading" ? "none" : "all")};

  &:active,
  &:hover {
    background-color: ${black};
    color: ${white};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${outlineFormControl};
  }
`;

export const StateContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: -30px;
  margin-left: 10px;
`;
