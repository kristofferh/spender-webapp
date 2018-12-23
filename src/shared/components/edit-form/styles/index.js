import styled from "@emotion/styled";

import { mainContent, maxWidthMd } from "shared/utils/styles/layout";

export const Form = styled.form`
  ${mainContent()};

  @media (max-width: ${maxWidthMd}) {
    margin: 0 -15px;
    padding: 15px;
  }
`;

export const FormGroup = styled.div`
  display: block;
  margin-bottom: 15px;
`;

export const DeleteLink = styled.a`
  cursor: pointer;
  display: block;
  margin-top: 15px;
  text-decoration: none;
`;
