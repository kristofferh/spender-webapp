import Home from "shared/components/home";
import Items from "shared/components/items";
import Create from "shared/components/create";

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
    component: Create
  },
  {
    name: "Item",
    path: "/items/:id",
    exact: true,
    component: Create
  }
];

export default routes;
