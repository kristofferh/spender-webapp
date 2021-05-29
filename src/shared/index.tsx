import styled from "@emotion/styled";
import { Provider as ThemeProvider } from "@kristofferh/businesskit";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { ResizeObserverClass } from "shared/components/observer/resize";
import { fetchProfile } from "shared/data/profile/actions";
import Nav from "./components/nav";
import Panel from "./components/panel";
import { RouteConfig } from "./components/route-config";
import routes from "./routes";

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
  const [containerWidth, setContainerWidth] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (hasLoginCookie) {
      dispatch(fetchProfile());
    }
  }, [hasLoginCookie]);

  const handleResize = ({ width }: DOMRect) => {
    setContainerWidth(width);
  };

  const background = location.state && location.state.background;
  return (
    <ThemeProvider>
      <ResizeObserverClass onResize={handleResize}>
        {(resizeRef) => (
          <Container ref={resizeRef}>
            {hasLoginCookie ? <Nav profile={profile} /> : null}
            <Switch location={background || location}>
              {routes.map((route, i) => {
                return (
                  <RouteConfig
                    inPanel={containerWidth > 640 && route.panel}
                    key={i}
                    loggedIn={hasLoginCookie}
                    {...route}
                  />
                );
              })}
            </Switch>
            {containerWidth > 640 ? (
              /* eslint-disable react/no-children-prop */
              <Route
                path="/test"
                children={({ match }: any) => {
                  return <Panel show={Boolean(match)}>hi</Panel>;
                }}
              />
            ) : null}
          </Container>
        )}
      </ResizeObserverClass>
    </ThemeProvider>
  );
};

export default App;
