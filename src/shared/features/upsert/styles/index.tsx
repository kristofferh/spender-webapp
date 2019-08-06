import styled from "@emotion/styled";
import { mainContainer, maxWidthMd } from "shared/utils/styles/layout";
import { titleOne } from "shared/utils/styles";

export const Container = styled.div`
  ${mainContainer()};

  @media (max-width: ${maxWidthMd}) {
    padding: 15px;
  }
`;

export const Title = styled.h1`
  ${titleOne()};
  margin-top: 0;
`;
