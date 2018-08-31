import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";

import { groupBy, sum } from "shared/utils/arrays";
import { toDecimal } from "shared/utils/number";

import Loader from "shared/components/loader";
import InfiniteScroll from "shared/components/infinite-scroll";
import Chart from "shared/components/chart";

import { fetchItems } from "shared/data/items/actions";

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
  ItemsList,
  MobileAdd
} from "./styles";

export class Items extends Component {
  constructor() {
    super();
    this.currentMonth = moment().format("Y-MM");
    this.currentMonthFormatted = moment().format("MMMM Y");
    this.currentDayOfMonth = moment().format("D");
    this.endOfMonth = moment()
      .endOf("month")
      .format("Y-MM-D H:m:s");
    this.currencyFormat = "$0,0.00"; // maybe make this a prop?
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
          <Amount>{numeral(amount).format(this.currencyFormat)}</Amount>
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

  // Group items by day.
  groupItems(items) {
    const itemList = items.map(item => {
      const { date } = item.node;
      return {
        ...item.node,
        date: moment(date).format("MMMM D, YYYY")
      };
    });
    const grouped = groupBy(itemList, "date");
    let newObject = {};
    Object.keys(grouped).forEach(day => {
      newObject[day] = {};
      newObject[day]["items"] = grouped[day];
      newObject[day]["sum"] = toDecimal(
        sum(grouped[day].map(item => item.amount))
      );
    });
    return newObject;
  }

  renderItems() {
    const { items } = this.props;

    if (!items.length) {
      return null;
    }

    const grouped = this.groupItems(items);
    return Object.keys(grouped).map(group => {
      const items = grouped[group]["items"];
      const sum = grouped[group]["sum"];
      return (
        <>
          <Date key={group}>
            {group}
            <Amount>{numeral(sum).format(this.currencyFormat)}</Amount>
          </Date>
          {items.map(item => {
            return this.renderItem(item);
          })}
        </>
      );
    });
  }

  renderAggregateDetails() {
    const { sum: sumValue, aggregateDetails = [] } = this.props;
    const aggregateItems = aggregateDetails.map(item => {
      const { date } = item.node;
      return {
        ...item.node,
        day: moment(date).format("MMMM D, YYYY")
      };
    });
    const groupedItems = groupBy(aggregateItems, "day");
    const dailySums = Object.keys(groupedItems).map(day => {
      return {
        date: day,
        sum: toDecimal(sum(groupedItems[day].map(item => item.amount)))
      };
    });
    return (
      <AggregateDetails>
        <CurrentMonth>{this.currentMonthFormatted}</CurrentMonth>
        <TotalAmount>{numeral(sumValue).format("$0,0.00")}</TotalAmount>
        <AvgAmount>
          {numeral(sumValue / this.currentDayOfMonth).format("$0,0.00")} per day
        </AvgAmount>
        <Chart values={dailySums} width={800} height={400} />
      </AggregateDetails>
    );
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
          <Container>
            {this.renderAggregateDetails()}
            <MobileAdd to="/items/create">+</MobileAdd>
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
  sum: PropTypes.number,
  aggregateDetails: PropTypes.array
};

const mapStateToProps = state => {
  const {
    list: {
      items,
      pageInfo,
      isFetching,
      isPaginating,
      aggregate: { sum, edges: aggregateDetails }
    }
  } = state;
  return {
    items,
    pageInfo,
    isFetching,
    isPaginating,
    sum,
    aggregateDetails
  };
};

export default connect(mapStateToProps, { fetchItems })(Items);
