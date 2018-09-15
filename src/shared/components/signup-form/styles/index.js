import styled from "react-emotion";

import { Input } from "shared/components/form-controls";

export const Container = styled.div`
  max-width: 430px;
  margin: auto;
  padding: 15px;
`;

export const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  border: 0;
  background-color: ${props =>
    props.disabled ? "rgba(0, 0, 0, 0.1)" : "#000"};
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  margin-top: 15px;
`;

export const StyledInput = styled(Input)`
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 3px 0 5px;
  transition: border-bottom 0.2s ease;
  border-radius: 0;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus,
  &:hover {
    border-bottom-color: #000;
    outline: 0;
  }
`;
