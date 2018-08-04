import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import styled from "react-emotion";

import Loader from "shared/components/loader";
import InfiniteScroll from "shared/components/infinite-scroll";

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
`;

export class Items extends Component {
  componentDidMount() {
    this.props.fetchItems({ first: 10 });
  }

  handleLoadMore = () => {
    const { endCursor } = this.props.pageInfo;
    this.props.fetchItems({ first: 10, after: endCursor }, true);
  };

  paginationLoader() {
    return <Loader color={"#000"} />;
  }

  renderItems() {
    const { items } = this.props;
    return items.map(item => {
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
            <span className="items-list-item-description">{description}</span>
            <span className="items-list-item-description">
              {numeral(amount).format("$0,0.00")}
            </span>
            <div className="items-list-item-tags">
              {tagEdges &&
                tagEdges.map(tag => {
                  const { name } = tag.node;
                  return (
                    <span key={name} className="items-list-item-tag">
                      {name}
                    </span>
                  );
                })}
            </div>
          </div>
        </ListItem>
      );
    });
  }

  render() {
    const {
      isFetching,
      isPaginating,
      pageInfo: { hasNextPage }
    } = this.props;
    return (
      <ItemsContainer>
        {isFetching ? (
          <Loader color={"#000"} />
        ) : (
          <div>
            <h1>Items</h1>
            <Link to="/items/create">Add</Link>
            <InfiniteScroll
              items={this.renderItems()}
              loadMore={this.handleLoadMore}
              loadingMore={isPaginating}
              hasMore={hasNextPage}
              loader={this.paginationLoader}
            />
          </div>
        )}
      </ItemsContainer>
    );
  }
}

Items.defaultProps = {
  items: [],
  pageInfo: {}
};

Items.propTypes = {
  routes: PropTypes.array,
  fetchItems: PropTypes.func,
  items: PropTypes.array,
  pageInfo: PropTypes.shape({
    startCursor: PropTypes.string,
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool
  }),
  isFetching: PropTypes.bool,
  isPaginating: PropTypes.bool
};

const mapStateToProps = state => {
  const {
    list: { items, pageInfo, isFetching, isPaginating }
  } = state;
  return {
    items,
    pageInfo,
    isFetching,
    isPaginating
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
