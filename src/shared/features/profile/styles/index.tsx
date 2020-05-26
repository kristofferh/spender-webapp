import styled from "@emotion/styled";
import { titleOne } from "shared/utils/styles";
import { mainContainer, maxWidthMd } from "shared/utils/styles/layout";

export const Container = styled.div`
  ${mainContainer()};

  @media (max-width: ${maxWidthMd}) {
    padding: 16px;
  }
`;

export const Title = styled.h1`
  ${titleOne()};
  margin-top: 0;
`;
