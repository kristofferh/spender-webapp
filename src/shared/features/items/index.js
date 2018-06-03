import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

import { fetchItems } from "./actions";

import "./styles/index.scss";

export class Items extends Component {
  componentDidMount() {
    this.props.fetchItems({ order: "date" });
  }

  render() {
    return (
      <div>
        <h1>Items</h1>
        <section className="items-list">
          {this.props.items.map(item => (
            <Link
              className="items-list-item"
              to={`/items/${item.id}`}
              key={item.id}
            >
              <span className="items-list-item-date">
                {moment(item.date).format("MMMM D, YYYY")}
              </span>
              <div className="item-list-item-details">
                <span className="items-list-item-description">
                  {item.description}
                </span>
                <div className="items-list-item-tags">
                  {item.tags &&
                    item.tags.map(tag => {
                      <span className="items-list-item-tag">{tag.name}</span>;
                    })}
                </div>
                <span className="items-list-item-description">
                  {numeral(item.amount).format("$0,0.00")}
                </span>
              </div>
            </Link>
          ))}
        </section>
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
  items: PropTypes.array
};

const mapStateToProps = state => {
  const { list } = state;
  return {
    items: list.items
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
