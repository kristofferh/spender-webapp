import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RouteWithSubRoutes } from "shared/utils";

const Items = ({ routes }) => {
  return (
    <div>
      Items
      <Link to="/items/create">Create</Link>
    </div>
  );
};

Items.propTypes = {
  routes: PropTypes.array
};

export default Items;
