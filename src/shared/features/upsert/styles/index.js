import styled from "react-emotion";

import { mainContainer } from "shared/utils/styles/layout";
import { titleOne } from "shared/utils/styles";

export const Container = styled.div`
  ${mainContainer()};
`;

export const Title = styled.h1`
  ${titleOne()};
  margin-top: 0;
`;
