import React, { Component } from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "@vx/gradient";
import { AreaClosed, LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";

import { Container } from "./styles";

const stock = [
  { date: "2007-04-24T07:00:00.000Z", close: 93.24 },
  { date: "2007-04-25T07:00:00.000Z", close: 95.35 },
  { date: "2007-04-26T07:00:00.000Z", close: 98.84 },
  { date: "2007-04-27T07:00:00.000Z", close: 99.92 },
  { date: "2007-04-30T07:00:00.000Z", close: 99.8 },
  { date: "2007-05-01T07:00:00.000Z", close: 99.47 }
];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

class Area extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),
    isResponsive: PropTypes.bool
  };

  static defaultProps = {
    width: 800,
    height: 400,
    margin: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    isResponsive: true
  };

  state = {
    render: !this.props.isResponsive,
    width: this.props.isResponsive ? null : this.props.width
  };

  componentDidMount() {
    if (this.props.isResponsive) {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }
  }

  handleResize = () => {
    if (this.container) {
      const containerSize = this.container.getBoundingClientRect();
      this.setState({ width: containerSize.width, render: true });
    }
  };

  render() {
    const { height, margin } = this.props;

    // bounds
    const xMax = this.state.width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xStock)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(stock, yStock) + yMax / 3]
    });

    return (
      <Container innerRef={n => (this.container = n)}>
        {this.state.render ? (
          <svg
            ref={s => (this.svg = s)}
            width={this.state.width}
            height={height}
          >
            <LinearGradient
              from="#fff"
              to="#fff"
              fromOpacity={0.8}
              toOpacity={1}
              id="stroke"
            />
            <LinearGradient
              from="#fff"
              to="#fff"
              fromOpacity={0.15}
              toOpacity={0}
              fromOffset="-10%"
              toOffset="50%"
              id="fill"
            />
            <GridRows
              lineStyle={{ pointerEvents: "none" }}
              scale={yScale}
              width={xMax}
              strokeDasharray="2,2"
              stroke="rgba(255,255,255,0.3)"
            />
            <GridColumns
              lineStyle={{ pointerEvents: "none" }}
              scale={xScale}
              height={yMax}
              strokeDasharray="2,2"
              stroke="rgba(255,255,255,0.3)"
            />
            <AreaClosed
              data={stock}
              xScale={xScale}
              yScale={yScale}
              x={xStock}
              y={yStock}
              strokeWidth={1}
              stroke={"transparent"}
              fill={"url(#fill)"}
              curve={curveMonotoneX}
            />
            <LinePath
              data={stock}
              xScale={xScale}
              yScale={yScale}
              x={xStock}
              y={yStock}
              stroke={"url(#stroke)"}
              strokeWidth={1}
              curve={curveMonotoneX}
            />
          </svg>
        ) : null}
      </Container>
    );
  }
}

export default Area;
