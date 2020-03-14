import React from "react";

import Logo from "shared/components/logo";

import { white } from "shared/utils/styles";

import { Container, Inner, MenuItem } from "./styles";

type Props = {
  authenticated: boolean;
};

const Nav: React.FC<Props> = ({ authenticated }) =>
  authenticated ? (
    <Container>
      <Inner>
        <MenuItem color={white} />
        <Logo />
      </Inner>
    </Container>
  ) : null;

export default Nav;
