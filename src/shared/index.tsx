import styled from "@emotion/styled";
import { Provider as ThemeProvider } from "@kristofferh/businesskit";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ResizeObserverClass } from "shared/components/observer/resize";
import { fetchProfile } from "shared/data/profile/actions";
import Nav from "./components/nav";
import Panel from "./components/panel";
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
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (hasLoginCookie) {
      dispatch(fetchProfile());
    }
  }, [hasLoginCookie]);

  const handleResize = ({ width }: DOMRect) => {
    setContainerWidth(width);
  };

  return (
    <ThemeProvider>
      <ResizeObserverClass onResize={handleResize}>
        {resizeRef => (
          <Container ref={resizeRef}>
            {hasLoginCookie ? <Nav profile={profile} /> : null}
            <Switch>
              {routes.map((route, i) => {
                return (
                  <RouteWithSubRoutes
                    key={i}
                    loggedIn={hasLoginCookie}
                    {...route}
                  />
                );
              })}
            </Switch>
            <div
              style={{
                position: "fixed",
                zIndex: 10000,
                background: "red",
                color: "white",
                padding: "1rem"
              }}
            >
              {containerWidth > 640 ? "BIG" : "small"}
            </div>
            {containerWidth > 640 ? (
              <Route
                path="/test"
                children={({ match, ...rest }) => {
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
