import styled from "@emotion/styled";
import { Loader as Spinner } from "businesskit";
import { Input } from "shared/components/form-controls";
import { Guilloche } from "shared/components/guilloche";
import {
  pageContainer,
  shadowBox,
  titleOne,
  zIndex1
} from "shared/utils/styles";

export const PageContainer = styled.div`
  ${pageContainer()};
  background-image: linear-gradient(
      180deg,
      transparent 0%,
      transparent 50%,
      #fff 50%
    ),
    linear-gradient(156deg, #e1cad3 6%, #a6a8bc 50%);
`;

export const Container = styled.div`
  max-width: 430px;
  margin: auto;
  padding: 16px;
  position: relative;
  z-index: ${zIndex1};
`;

export const Header = styled.header`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  ${titleOne};
  color: #685b62;
  text-align: center;
`;

export const InnerContainer = styled.div`
  ${shadowBox()};
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
`;

export const SlideContainer = styled.div<{ success: boolean }>`
  transform: ${({ success }) =>
    success ? "translateX(-100%)" : "translateX(0)"};
  transition: transform 0.2s ease-out;
  white-space: nowrap;
`;

export const Slide = styled.div`
  display: inline-block;
  width: 100%;
  padding: 32px;
  vertical-align: middle;
  white-space: normal;
`;

export const Success = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  text-align: center;
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
  margin-top: 16px;
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
  text-align: inherit;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus,
  &:hover {
    border-bottom-color: #000;
    outline: 0;
  }
`;

export const StyledGuilloche = styled(Guilloche)`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
`;

export const Loader = styled(Spinner)`
  margin: 10px auto;
`;
