import styled from "react-emotion";

import { flatInput } from "shared/utils/styles/layout";

export const StyledInput = styled.textarea`
  ${flatInput()};
  height: 30px;
  resize: none;
`;
