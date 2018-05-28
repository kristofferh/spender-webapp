import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// Wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => {
      if (route.public || Cookies.get("spender-session")) {
        return <route.component {...props} routes={route.routes} />;
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

export const makeRequest = (query, authorize) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (authorize) {
    headers = {
      ...headers,
      Authorization: `Bearer ${Cookies.get("spender-session")}`
    };
  }
  return fetchWrapper("http://localhost:3000", {
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
