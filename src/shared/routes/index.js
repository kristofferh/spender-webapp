import Home from "shared/components/home";
import Items from "shared/components/items";
import Edit from "shared/containers/edit";

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
    component: Edit
  },
  {
    name: "Item",
    path: "/items/:id",
    exact: true,
    component: Edit
  }
];

export default routes;
