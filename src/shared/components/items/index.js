import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Create from "shared/components/create";

import { fetchItems } from "./actions";

export class Items extends Component {
  componentDidMount() {
    this.props.fetchItems({ order: "date" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.add !== this.props.add) {
      this.props.fetchItems({ order: "date" });
    }
  }

  render() {
    return (
      <div>
        <h1>Items</h1>
        {this.props.items.map(item => (
          <Link to={`/items/${item.id}`} key={item.id}>
            <span className="date">{item.date}</span>
            <span className="amount">${item.amount}</span>
            {item.description}
          </Link>
        ))}
        <Create />
      </div>
    );
  }
}

Items.defaultProps = {
  items: []
};

Items.propTypes = {
  routes: PropTypes.array,
  fetchItems: PropTypes.func,
  items: PropTypes.array,
  add: PropTypes.object
};

const mapStateToProps = state => {
  const { list, create } = state;
  return {
    add: create.item,
    items: list.items
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
