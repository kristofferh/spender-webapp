import styled from "@emotion/styled";
import { mainContent, maxWidthMd } from "shared/utils/styles/layout";

export const Form = styled.form`
  ${mainContent()};
  width: auto;

  @media (max-width: ${maxWidthMd}) {
    margin: 0 -16px;
    padding: 16px;
  }
`;

export const FormGroup = styled.div`
  display: block;
  margin-bottom: 16px;
`;
