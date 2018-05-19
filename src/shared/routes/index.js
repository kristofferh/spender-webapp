import Home from "shared/components/home";
import Items from "shared/containers/items";
import Upsert from "shared/containers/upsert";
import RequestToken from "shared/containers/request-token";
import Verify from "shared/containers/verify";

// APP Routes
const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: Home
  },
  {
    name: "items",
    path: "/items",
    component: Items,
    exact: true
  },
  {
    name: "create",
    path: "/items/create",
    exact: true,
    component: Upsert
  },
  {
    name: "Item",
    path: "/items/:id",
    exact: true,
    component: Upsert
  },
  {
    name: "signup",
    path: "/login",
    exact: true,
    component: RequestToken
  },
  {
    name: "verify",
    path: "/verify",
    exact: true,
    component: Verify
  }
];

export default routes;
