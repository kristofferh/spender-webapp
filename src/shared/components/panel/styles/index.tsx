import styled from "@emotion/styled";

import { white, zIndex10 } from "shared/utils/styles";

type ContainerProps = {
  slideDirection?: "ltr" | "rtl";
};

export const Container = styled.aside<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform: ${({ slideDirection }: ContainerProps) =>
    slideDirection === "rtl" ? "translateX(100%)" : "translate(-100%)"};
  z-index: ${zIndex10};
  background: ${white};
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;
