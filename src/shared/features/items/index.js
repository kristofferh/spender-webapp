import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import styled from "react-emotion";

import Loader from "shared/components/loader";

import { fetchItems } from "./actions";

const ListItem = styled(Link)`
  display: block;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
  text-decoration: none;
  color: inherit;
`;

const ItemsContainer = styled.div`
  width: 100%;
  margin: ${({ isLoading }) => (isLoading ? "auto" : null)};
`;

export class Items extends Component {
  componentDidMount() {
    this.props.fetchItems({ first: 10 });
  }

  render() {
    const { edges } = this.props.items;
    return (
      <ItemsContainer isLoading={this.props.isFetching}>
        {this.props.isFetching ? (
          <Loader color={"#000"} />
        ) : (
          <div>
            <h1>Items</h1>
            <Link to="/items/create">Add</Link>
            <section className="items-list">
              {edges &&
                edges.map(item => {
                  const {
                    id,
                    date,
                    description,
                    amount,
                    tags: { edges: tagEdges = [] }
                  } = item.node;
                  return (
                    <ListItem to={`/items/${id}`} key={id}>
                      <span className="items-list-item-date">
                        {moment(date).format("MMMM D, YYYY")}
                      </span>
                      <div className="item-list-item-details">
                        <span className="items-list-item-description">
                          {description}
                        </span>
                        <span className="items-list-item-description">
                          {numeral(amount).format("$0,0.00")}
                        </span>
                        <div className="items-list-item-tags">
                          {tagEdges &&
                            tagEdges.map(tag => {
                              const { name } = tag.node;
                              return (
                                <span
                                  key={name}
                                  className="items-list-item-tag"
                                >
                                  {name}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    </ListItem>
                  );
                })}
            </section>
          </div>
        )}
      </ItemsContainer>
    );
  }
}

Items.defaultProps = {
  items: {
    edges: []
  }
};

Items.propTypes = {
  routes: PropTypes.array,
  fetchItems: PropTypes.func,
  items: PropTypes.shape({
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool
    }),
    edges: PropTypes.array
  }),
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  const { list } = state;
  return {
    items: list.items,
    isFetching: list.isFetching
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
