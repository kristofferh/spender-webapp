import { css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import rgba from "polished/lib/color/rgba";
import { shadowBox } from "shared/utils/styles";
import { error, havelockBlue } from "shared/utils/styles/colors";

type ContainerProps = {
  isDragActive?: boolean;
  isDragAccept?: boolean;
  isDragReject?: boolean;
};

type PreviewImgProps = {
  size?: string | number;
};

export const outlinePulse = keyframes`
0% {
    box-shadow: 0 0 1px 1px ${havelockBlue};
  }

  100% {
    box-shadow: 0 0 1px 2px ${rgba(havelockBlue, 0.01)};
  }
`;

export const outlinePulseError = keyframes`
    0% {
      box-shadow: 0 0 1px 1px ${error};
    }
  
    100% {
      box-shadow: 0 0 1px 2px ${rgba(error, 0.01)};
    }
`;

const dragState = (props: ContainerProps) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const Container = styled.div<ContainerProps>`
  ${shadowBox()};
  padding: 16px;
  min-height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${props =>
    props.isDragAccept
      ? defaultActiveStyles
      : props.isDragReject
      ? defaultRejectStyles
      : null}
`;

export const Label = styled.div`
  margin: auto;
  display: inline-flex;
`;

export const Preview = styled.div`
  margin: auto;
  text-align: center;
`;

export const PreviewImg = styled.img<PreviewImgProps>`
  object-fit: cover;
  width: ${({ size }) => (size ? `${size}px` : undefined)};
  height: ${({ size }) => (size ? `${size}px` : undefined)};
  border-radius: 50%;
`;

export const PreviewText = styled.div`
  word-break: break-word;
`;

export const Prompt = styled.div``;

export const defaultActiveStyles = css`
  animation: ${outlinePulse} 0.8s -0.8s ease infinite alternate;
`;

export const defaultRejectStyles = css`
  animation: ${outlinePulseError} 0.8s -0.8s ease infinite alternate;
`;

export const Reject = styled.div`
  margin: auto;
  text-align: center;
`;
