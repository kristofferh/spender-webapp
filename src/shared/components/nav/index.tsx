import classNames from "classnames";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Menu } from "shared/components/icons";
import Logo from "shared/components/logo";
import { ProfileState } from "shared/data/profile/constants";
import { imageUrl } from "shared/utils/assets";
import { white } from "shared/utils/styles";
import { Avatar, Container, Inner, MenuWrapper, PrimaryNav } from "./styles";

interface Props {
  profile?: ProfileState;
}

export const Nav: React.FC<Props> = ({ profile }) => {
  const { profile: profileDetails } = profile || {};
  const [showNav, toggleShowNav] = useState(false);
  const handleMenuClick = () => {
    toggleShowNav(!showNav);
  };
  const avatarUrl =
    profileDetails && profileDetails.avatar
      ? imageUrl(profileDetails.avatar, {
          resize: { width: 80, height: 80, fit: "cover" }
        })
      : undefined;
  return (
    <Container>
      <Helmet>
        <body className={classNames({ "hide-overflow": showNav })} />
      </Helmet>
      <Inner>
        <MenuWrapper onClick={handleMenuClick}>
          <Menu color={white} />
        </MenuWrapper>
        <Logo />
        <Avatar
          src={avatarUrl}
          alt={`${profileDetails?.firstName} ${profileDetails?.lastName}`}
        />
      </Inner>
      <PrimaryNav active={showNav}>
        <nav className="primary-nav__content">Not implemented :(</nav>
        <Link to="/test">Test</Link>
      </PrimaryNav>
    </Container>
  );
};
export default Nav;
