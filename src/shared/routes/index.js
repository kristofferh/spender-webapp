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
    exact: true,
    component: Items,
    routes: []
  },
  {
    name: "create",
    path: "/items/create",
    component: Create
  }
];

export default routes;
