import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// Wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => {
  const { public: publicPath, loggedIn, routes, path } = route;
  return (
    <Route
      path={path}
      render={props => {
        if (publicPath || loggedIn) {
          return <route.component {...props} routes={routes} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          );
        }
        // pass the sub-routes down to keep nesting
      }}
    />
  );
};

export const fetchWrapper = (url, params) => {
  if (!url || typeof url !== "string") {
    throw new Error("fetchWrapper requires a string URL as the first argument");
  }

  const commonParams = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  const mergedParams = { ...commonParams, ...params };
  return fetch(url, mergedParams).then(handleResponse);
};

export const makeRequest = (query, authorize = true) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (authorize) {
    headers = {
      ...headers,
      Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`
    };
  }
  return fetchWrapper(API_URL, {
    method: "POST",
    body: query,
    headers
  }).then(json => {
    if (json.errors) {
      throw json.errors;
    } else if (json.data) {
      return json.data;
    }
  });
};

const handleResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    // Do something different with Errors?
    return response.json();
  }
};
