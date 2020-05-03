import styled from "@emotion/styled";
import rgba from "polished/lib/color/rgba";
import { space, white } from "shared/utils/styles";

export const Content = styled.span`
  padding: 8px;
  border-radius: 4px;
  background: ${space};
  color: ${white};
  box-shadow: 0 2px 3px ${rgba(space, 0.1)};
  display: inline-flex;
`;
