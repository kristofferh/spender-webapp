import styled from "react-emotion";

import { Input } from "shared/components/form-controls";
import { shadowBox } from "shared/utils/styles";

export const Container = styled.div`
  max-width: 430px;
  margin: auto;
  padding: 15px;
`;

export const InnerContainer = styled.div`
  ${shadowBox()};
  width: 100%;
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  transform: ${({ success }) =>
    success ? "translateX(-100%)" : "translateX(0)"};
  transition: transform 0.2s ease-out;
  white-space: nowrap;
`;

export const Slide = styled.div`
  display: inline-block;
  width: 100%;
  padding: 20px;
  vertical-align: middle;
  white-space: normal;
`;

export const Success = styled.div`
  text-align: center;
`;

export const Form = styled.form``;

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
