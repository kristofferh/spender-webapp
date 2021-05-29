import React, { Component } from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "@vx/gradient";
import { AreaClosed, LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";

import { Container } from "./styles";

// accessors
const xValue = (d) => new Date(d.date);
const yValue = (d) => d.sum;

export default class Chart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isResponsive: PropTypes.bool,
    values: PropTypes.array,
  };

  static defaultProps = {
    width: 800,
    height: 400,
    isResponsive: true,
    values: [],
  };

  state = {
    render: !this.props.isResponsive,
    width: this.props.isResponsive ? null : this.props.width,
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
    const { height, values } = this.props;
    const { width, render } = this.state;

    // scales
    const xScale = scaleTime({
      range: [0, width],
      domain: extent(values, xValue),
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [0, max(values, yValue) + height / 3],
    });

    return (
      <Container ref={(n) => (this.container = n)}>
        {render ? (
          <svg ref={(s) => (this.svg = s)} width={width} height={height}>
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
              fromOpacity={1}
              toOpacity={0.02}
              id="fill"
            />
            <AreaClosed
              data={values}
              xScale={xScale}
              yScale={yScale}
              x={xValue}
              y={yValue}
              strokeWidth={1}
              stroke={"transparent"}
              fill={"url(#fill)"}
              curve={curveMonotoneX}
            />
            <LinePath
              data={values}
              xScale={xScale}
              yScale={yScale}
              x={xValue}
              y={yValue}
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
