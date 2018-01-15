import Home from "shared/components/home";
import Items from "shared/components/items";
import Upsert from "shared/containers/upsert";

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
  }
];

export default routes;
