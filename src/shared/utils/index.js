import React from "react";
import { Route } from "react-router-dom";

// Wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
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

export const makeRequest = query => {
  return fetchWrapper("http://localhost:3000", {
    method: "POST",
    body: query
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
