import styled from "@emotion/styled";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { fetchProfile } from "shared/data/profile/actions";
import Nav from "./components/nav";
import routes from "./routes";
import { RouteWithSubRoutes } from "./utils";

interface Props {
  userLoggedin: () => void;
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const App: React.FC<Props> = () => {
  const hasLoginCookie = Boolean(Cookies.get(SESSION_COOKIE));
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasLoginCookie) {
      dispatch(fetchProfile());
    }
  }, [hasLoginCookie]);

  return (
    <Container>
      {hasLoginCookie ? <Nav profile={profile} /> : null}
      <Switch>
        {routes.map((route, i) => {
          return (
            <RouteWithSubRoutes key={i} loggedIn={hasLoginCookie} {...route} />
          );
        })}
      </Switch>
    </Container>
  );
};

export default App;
