import { Badge } from "@kristofferh/businesskit";
import moment from "moment";
import numeral from "numeral";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "shared/components/chart";
import ChartOverlay from "shared/components/chart-overlay";
import InfiniteScroll from "shared/components/infinite-scroll";
import { fetchItems } from "shared/data/items/actions";
import { groupBy, sum } from "shared/utils/arrays";
import { toDecimal } from "shared/utils/number";
import { badgeStyles, black, white } from "shared/utils/styles";
import {
  Add,
  AggregateDetails,
  Amount,
  AvgAmount,
  Container,
  CurrentMonth,
  Date,
  Description,
  Details,
  DetailsContainer,
  ItemsContainer,
  ItemsList,
  LeftArrow,
  ListItem,
  Loader,
  NoItems,
  RightArrow,
  TagAmount,
  TagList,
  TagListItem,
  TagName,
  Tags,
  TitleContainer,
  TotalAmount
} from "./styles";

export class Items extends Component {
  static defaultProps = {
    items: [],
    pageInfo: {},
    pageSize: 10,
    currencyFormat: "$0,0.00"
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
    history: PropTypes.object,
    location: PropTypes.object,
    currencyFormat: PropTypes.string
  };

  state = {
    currentDayOfMonth: "",
    currentMonth: "",
    currentMonthFormatted: "",
    endOfMonth: ""
  };

  componentDidMount() {
    this.updateDates();
  }

  updateDates() {
    const {
      location: { search }
    } = this.props;
    const params = new URLSearchParams(search);
    const month = params.get("month");
    const year = params.get("year");
    const date = this.formatDates(month, year);
    this.setState(date, () => this.update());
  }

  componentDidUpdate(prevProps) {
    const locationChanged = this.props.location !== prevProps.location;
    if (locationChanged) {
      this.updateDates();
    }
  }

  update(sync) {
    this.props.fetchItems({
      first: this.props.pageSize,
      startDate: this.state.currentMonth,
      endDate: this.state.endOfMonth
    });
    if (sync) {
      this.syncURL();
    }
  }

  syncURL() {
    const {
      history: { push }
    } = this.props;
    const month = this.state.date.format("M");
    const year = this.state.date.format("Y");
    const params = new URLSearchParams();
    params.set("month", month);
    params.set("year", year);
    push(`?${params.toString()}`);
  }

  formatDates(month, year) {
    let currentDate = moment();
    let date;
    let currentDayOfMonth;
    if (month && year) {
      date = moment(`${year}-${month}`, "Y-MM");
      const isCurrentMonth = moment(currentDate).isSame(date, "month");
      currentDayOfMonth = isCurrentMonth
        ? currentDate.format("D")
        : date.endOf("month").format("D");
    } else {
      date = currentDate;
      currentDayOfMonth = date.format("D");
    }
    const currentMonth = date.format("Y-MM");
    const currentMonthFormatted = date.format("MMMM Y");
    const endOfMonth = date.endOf("month").format("Y-MM-D H:m:s");
    return {
      date,
      currentMonth,
      currentDayOfMonth,
      currentMonthFormatted,
      endOfMonth
    };
  }

  handleLoadMore = () => {
    const { endCursor } = this.props.pageInfo;
    this.props.fetchItems(
      {
        first: this.props.pageSize,
        after: endCursor,
        startDate: this.state.currentMonth,
        endDate: this.state.endOfMonth
      },
      true
    );
  };

  paginationLoader() {
    return <Loader showDashAnimation showBackground color={black} />;
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
          <Amount>{numeral(amount).format(this.props.currencyFormat)}</Amount>
          <Tags>
            {tagEdges &&
              tagEdges.map(tag => {
                const { name, color } = tag.node;
                return (
                  <Badge
                    key={name}
                    sx={{
                      ...badgeStyles,
                      backgroundColor: color
                    }}
                  >
                    {name}
                  </Badge>
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
            <Amount>{numeral(sum).format(this.props.currencyFormat)}</Amount>
          </Date>
          {items.map(item => {
            return this.renderItem(item);
          })}
        </>
      );
    });
  }

  handleNextClick = () => {
    const nextMonth = moment(this.state.currentMonth, "Y-MM").add(1, "M");
    const month = nextMonth.format("M");
    const year = nextMonth.format("Y");
    const date = this.formatDates(month, year);
    this.setState(date, () => this.syncURL());
  };

  handlePreviousClick = () => {
    const previousMonth = moment(this.state.currentMonth, "Y-MM").subtract(
      1,
      "M"
    );
    const month = previousMonth.format("M");
    const year = previousMonth.format("Y");
    const date = this.formatDates(month, year);
    this.setState(date, () => this.syncURL());
  };

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
        <DetailsContainer>
          <TitleContainer>
            <LeftArrow color={white} onClick={this.handlePreviousClick} />
            <CurrentMonth>{this.state.currentMonthFormatted}</CurrentMonth>
            <RightArrow color={white} onClick={this.handleNextClick} />
          </TitleContainer>
          <TotalAmount>{numeral(sumValue).format("$0,0.00")}</TotalAmount>
          <AvgAmount>
            {numeral(sumValue / this.state.currentDayOfMonth).format("$0,0.00")}{" "}
            / day ·{" "}
            {numeral(dailySansRent / this.state.currentDayOfMonth).format(
              "$0,0.00"
            )}{" "}
            / day
          </AvgAmount>
        </DetailsContainer>
        <ChartOverlay>
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
        </ChartOverlay>
      </AggregateDetails>
    );
  }

  render() {
    const {
      items,
      isFetching,
      isPaginating,
      pageInfo: { hasNextPage }
    } = this.props;
    return (
      <ItemsContainer>
        {isFetching ? (
          <Loader showDashAnimation showBackground color={black} />
        ) : (
          <Container>
            {this.renderAggregateDetails()}
            <Add to="/items/create">+</Add>
            <ItemsList>
              {items.length ? (
                <InfiniteScroll
                  items={this.renderItems()}
                  loadMore={this.handleLoadMore}
                  loadingMore={isPaginating}
                  hasMore={hasNextPage}
                  loader={this.paginationLoader}
                />
              ) : (
                <NoItems>No items yet.</NoItems>
              )}
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

export default connect(mapStateToProps, { fetchItems })(Items);
