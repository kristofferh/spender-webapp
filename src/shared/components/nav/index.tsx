import classNames from "classnames";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Menu } from "shared/components/icons";
import Logo from "shared/components/logo";
import { white } from "shared/utils/styles";
import { Container, Inner, MenuWrapper, PrimaryNav } from "./styles";

type Props = {
  authenticated: boolean;
};

const Nav: React.FC<Props> = ({ authenticated }) => {
  const [showNav, toggleShowNav] = useState(false);
  const handleMenuClick = () => {
    toggleShowNav(!showNav);
  };
  return authenticated ? (
    <Container>
      <Helmet>
        <body className={classNames({ "hide-overflow": showNav })} />
      </Helmet>
      <Inner>
        <MenuWrapper onClick={handleMenuClick}>
          <Menu color={white} />
        </MenuWrapper>
        <Logo />
      </Inner>
      <PrimaryNav active={showNav}>
        <nav className="primary-nav__content">Not implemented :(</nav>
      </PrimaryNav>
    </Container>
  ) : null;
};
export default Nav;
