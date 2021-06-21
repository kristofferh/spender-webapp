import { NotFound } from "shared/components/not-found";
import Items from "shared/features/items";
import Logout from "shared/features/logout";
import Profile from "shared/features/profile";
import RequestToken from "shared/features/request-token";
import Upsert from "shared/features/upsert";
import Verify from "shared/features/verify";

// APP Routes
export const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: Items,
  },
  {
    name: "logout",
    path: "/logout",
    component: Logout,
    public: true,
  },
  {
    name: "create",
    path: "/items/create",
    component: Upsert,
  },
  {
    name: "item",
    path: "/items/:id",
    exact: true,
    component: Upsert,
  },
  {
    name: "signup",
    path: "/login",
    exact: true,
    component: RequestToken,
    public: true,
  },
  {
    name: "verify",
    path: "/verify",
    exact: true,
    component: Verify,
    public: true,
  },
  {
    name: "profile",
    path: "/profile",
    exact: true,
    component: Profile,
    panel: true,
  },
  {
    name: "not-found",
    component: NotFound,
  },
];

export default routes;
