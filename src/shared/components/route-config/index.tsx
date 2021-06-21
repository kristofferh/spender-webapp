import React from "react";
import { Redirect, Route } from "react-router-dom";
import Panel from "shared/components/panel";

export interface Props {
  public?: boolean;
  loggedIn: boolean;
  routes?: any;
  path?: string;
  component: any;
  inPanel?: boolean;
}

// Wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteConfig = (props: Props) => {
  const {
    public: publicPath,
    loggedIn,
    routes,
    path,
    component: Component,
    inPanel,
  } = props;

  /* eslint-disable react/no-children-prop */
  return (
    <Route
      path={path}
      children={(childrenProps) => {
        if (!Component) {
          return null;
        }
        if (publicPath || loggedIn) {
          if (inPanel) {
            return (
              <Panel show={Boolean(childrenProps.match)}>
                <Component {...childrenProps} routes={routes} />
              </Panel>
            );
          }
          return <Component {...childrenProps} routes={routes} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};
