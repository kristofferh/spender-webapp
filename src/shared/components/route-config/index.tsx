import React from "react";
import { Redirect, Route } from "react-router-dom";

export interface Props {
  public?: boolean;
  loggedIn: boolean;
  routes?: any;
  path: string;
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
    component: Component
  } = props;

  /* eslint-disable react/no-children-prop */
  return (
    <Route
      path={path}
      children={childrenProps => {
        if (!Component) {
          return null;
        }
        if (publicPath || loggedIn) {
          return <Component {...childrenProps} routes={routes} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          );
        }
      }}
    />
  );
};
