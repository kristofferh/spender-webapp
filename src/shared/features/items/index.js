import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

import { groupBy } from "shared/utils/arrays";

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
  CurrentMonth,
  Container,
  ItemsList
} from "./styles";

export class Items extends Component {
  constructor() {
    super();
    this.currentMonth = moment().format("Y-MM");
    this.currentMonthFormatted = moment().format("MMMM Y");
    this.currentDayOfMonth = moment().format("D");
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

  renderItem(item) {
    const {
      id,
      description,
      amount,
      tags: { edges: tagEdges = [] }
    } = item;
    return (
      <ListItem to={`/items/${id}`} key={id}>
        <Details>
          <Description>{description}</Description>
          <Amount>{amount}</Amount>
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
  }

  renderItems() {
    const { items } = this.props;

    if (!items.length) {
      return null;
    }

    const itemList = items.map(item => {
      const { amount, date } = item.node;
      return {
        ...item.node,
        date: moment(date).format("MMMM D, YYYY"),
        amount: numeral(amount).format("$0,0.00")
      };
    });
    const grouped = groupBy(itemList, "date");

    return Object.keys(grouped).map(group => {
      return (
        <>
          <Date key={group}>{group}</Date>
          {grouped[group].map(item => {
            return this.renderItem(item);
          })}
        </>
      );
    });
  }

  render() {
    const {
      isFetching,
      isPaginating,
      pageInfo: { hasNextPage },
      sum
    } = this.props;
    return (
      <ItemsContainer>
        {isFetching ? (
          <Loader color={"#000"} />
        ) : (
          <Container>
            <AggregateDetails>
              <CurrentMonth>{this.currentMonthFormatted}</CurrentMonth>
              <TotalAmount>{numeral(sum).format("$0,0.00")}</TotalAmount>
              <AvgAmount>
                {numeral(sum / this.currentDayOfMonth).format("$0,0.00")} per
                day
              </AvgAmount>
            </AggregateDetails>
            <Link to="/items/create">Add</Link>
            <ItemsList>
              <InfiniteScroll
                items={this.renderItems()}
                loadMore={this.handleLoadMore}
                loadingMore={isPaginating}
                hasMore={hasNextPage}
                loader={this.paginationLoader}
              />
            </ItemsList>
          </Container>
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
