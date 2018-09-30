import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";
import queryString from "query-string";

import { black } from "shared/utils/styles";
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
  MobileAdd,
  TagList,
  TagListItem,
  TagAmount,
  TagName
} from "./styles";

export class Items extends Component {
  static defaultProps = {
    items: [],
    pageInfo: {},
    pageSize: 10
  };

  static propTypes = {
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
    aggregateDetails: PropTypes.array,
    aggregateTags: PropTypes.array,
    location: PropTypes.object
  };

  constructor() {
    super();
    this.currencyFormat = "$0,0.00"; // maybe make this a prop?
  }

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const params = queryString.parse(search);
    const { month, year } = params;
    this.formatDates(month, year);
    this.props.fetchItems({
      first: this.props.pageSize,
      startDate: this.currentMonth,
      endDate: this.endOfMonth
    });
  }

  formatDates(month, year) {
    let date = moment();
    if (month && year) {
      date = moment(`${year}-${month}`, "Y-MM");
      this.currentDayOfMonth = date.endOf("month").format("D");
    } else {
      this.currentDayOfMonth = date.format("D");
    }
    this.currentMonth = date.format("Y-MM");
    this.currentMonthFormatted = date.format("MMMM Y");
    this.endOfMonth = date.endOf("month").format("Y-MM-D H:m:s");
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
    return <Loader color={black} />;
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
    const {
      sum: sumValue,
      aggregateDetails = [],
      aggregateTags = []
    } = this.props;
    // Filter out rent. @todo: this should be a setting.
    const aggregateItems = aggregateDetails
      .map(item => {
        const { date } = item.node;
        return {
          ...item.node,
          day: moment(date).format("MMMM D, YYYY")
        };
      })
      .filter(item => {
        const {
          tags: { edges: tags }
        } = item;
        const values = tags.map(({ node: { name } }) => name);
        return !values.includes("rent");
      });
    const groupedItems = groupBy(aggregateItems, "day");
    const dailySums = Object.keys(groupedItems).map(day => {
      return {
        date: day,
        sum: toDecimal(sum(groupedItems[day].map(item => item.amount)))
      };
    });
    const dailySansRent = toDecimal(sum(dailySums.map(daily => daily.sum)));
    const aggregateTagsList = aggregateTags
      .sort((a, b) => b.sumItems - a.sumItems)
      .filter(tag => tag.countItems)
      .slice(0, 10);
    return (
      <AggregateDetails>
        <CurrentMonth>{this.currentMonthFormatted}</CurrentMonth>
        <TotalAmount>{numeral(sumValue).format("$0,0.00")}</TotalAmount>
        <AvgAmount>
          {numeral(sumValue / this.currentDayOfMonth).format("$0,0.00")} / day ·{" "}
          {numeral(dailySansRent / this.currentDayOfMonth).format("$0,0.00")} /
          day
        </AvgAmount>
        <AvgAmount />
        <Chart values={dailySums} width={800} height={400} />
        <TagList>
          {aggregateTagsList.map(tag => {
            const {
              sumItems,
              node: { name }
            } = tag;
            return (
              <TagListItem key={name}>
                <TagName>{name}</TagName>
                <TagAmount>{numeral(sumItems).format("$0,0.00")}</TagAmount>
              </TagListItem>
            );
          })}
        </TagList>
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
          <Loader color={black} />
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

const mapStateToProps = state => {
  const {
    list: {
      items,
      pageInfo,
      isFetching,
      isPaginating,
      aggregate: { sum, edges: aggregateDetails },
      aggregateTags: { edges: aggregateTags }
    }
  } = state;
  return {
    items,
    pageInfo,
    isFetching,
    isPaginating,
    sum,
    aggregateDetails,
    aggregateTags
  };
};

export default connect(
  mapStateToProps,
  { fetchItems }
)(Items);
