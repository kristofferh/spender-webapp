import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const asyncCatch = promise => {
  return promise.then(data => [data, null]).catch(error => [null, error]);
};

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

export const fileUpload = async file => {
  const query = `
    mutation requestUrl($contentType: String, $file: String) {
      requestUploadURL(contentType: $contentType, file: $file) {
        url
        key
      }
    }
  `;
  const variables = { contentType: file.type, file: file.name };
  const [data, error] = await asyncCatch(
    makeRequest(JSON.stringify({ query, variables }))
  );
  if (error) {
    return error;
  }
  const {
    requestUploadURL: { url, key }
  } = data;

  const response = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type
    }
  });

  if (response.status !== 200) {
    return error;
  }
  return key;
};
