import Logout from "shared/features/logout";
import Items from "shared/features/items";
import Upsert from "shared/features/upsert";
import RequestToken from "shared/features/request-token";
import Verify from "shared/features/verify";

// APP Routes
const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: Items
  },
  {
    name: "logout",
    path: "/logout",
    component: Logout,
    public: true
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
    component: RequestToken,
    public: true
  },
  {
    name: "verify",
    path: "/verify",
    exact: true,
    component: Verify,
    public: true
  }
];

export default routes;
