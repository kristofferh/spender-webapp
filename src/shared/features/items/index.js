import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

import Loader from "shared/components/loader";
import InfiniteScroll from "shared/components/infinite-scroll";

import { fetchItems } from "./actions";

import {
  Date,
  Details,
  Description,
  Amount,
  Tags,
  Tag,
  ListItem,
  ItemsContainer,
  TotalAmount,
  AvgAmount,
  AggregateDetails,
  CurrentMonth
} from "./styles";

export class Items extends Component {
  constructor() {
    super();
    this.currentMonth = moment().format("Y-MM");
    this.currentMonthFormatted = moment().format("MMMM Y");
    this.endOfMonth = moment()
      .endOf("month")
      .format("Y-MM-D");
  }

  componentDidMount() {
    this.props.fetchItems({
      first: this.props.pageSize,
      startDate: this.currentMonth,
      endDate: this.endOfMonth
    });
  }

  handleLoadMore = () => {
    const { endCursor } = this.props.pageInfo;
    this.props.fetchItems(
      {
        first: this.props.pageSize,
        after: endCursor,
        startDate: this.currentMonth,
        endDate: this.endOfMonth
      },
      true
    );
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
          <Date>{moment(date).format("MMMM D, YYYY")}</Date>
          <Details>
            <Description>{description}</Description>
            <Amount>{numeral(amount).format("$0,0.00")}</Amount>
            <Tags>
              {tagEdges &&
                tagEdges.map(tag => {
                  const { name, color } = tag.node;
                  return (
                    <Tag key={name} bgColor={color}>
                      {name}
                    </Tag>
                  );
                })}
            </Tags>
          </Details>
        </ListItem>
      );
    });
  }

  render() {
    const {
      isFetching,
      isPaginating,
      pageInfo: { hasNextPage },
      avg,
      sum
    } = this.props;
    return (
      <ItemsContainer>
        {isFetching ? (
          <Loader color={"#000"} />
        ) : (
          <div>
            <AggregateDetails>
              <CurrentMonth>{this.currentMonthFormatted}</CurrentMonth>
              <TotalAmount>{numeral(sum).format("$0,0.00")}</TotalAmount>
              <AvgAmount>{numeral(avg).format("$0,0.00")} per day</AvgAmount>
            </AggregateDetails>
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
  pageInfo: {},
  pageSize: 10
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
  isPaginating: PropTypes.bool,
  pageSize: PropTypes.number,
  avg: PropTypes.number,
  sum: PropTypes.number
};

const mapStateToProps = state => {
  const {
    list: { items, pageInfo, isFetching, isPaginating, avg, sum }
  } = state;
  return {
    items,
    pageInfo,
    isFetching,
    isPaginating,
    avg,
    sum
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
