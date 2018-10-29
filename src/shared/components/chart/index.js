import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { localPoint } from "@vx/event";
import { LinearGradient } from "@vx/gradient";
import { AreaClosed, LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { scaleTime, scaleLinear } from "@vx/scale";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { extent, max /*, bisector */ } from "d3-array";

import { Container } from "./styles";

// accessors
const xValue = d => new Date(d.date);
const yValue = d => d.sum;
// const bisectDate = bisector(d => new Date(d.date)).left;

export class Chart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isResponsive: PropTypes.bool,
    values: PropTypes.array,
    showTooltip: PropTypes.func,
    tooltipData: PropTypes.any,
    tooltipLeft: PropTypes.number,
    tooltipTop: PropTypes.number
  };

  static defaultProps = {
    width: 800,
    height: 400,
    isResponsive: true,
    values: []
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

  handleMouseMove({ event /*, data, xScale */ }) {
    const { x } = localPoint(this.svg, event);

    // const x0 = xScale.invert(x);
    //const index = bisectDate(data, x0, 1);
    this.props.showTooltip({
      tooltipLeft: x,
      tooltipTop: 10,
      tooltipData: "hi"
    });
  }

  render() {
    const { height, values, tooltipData, tooltipLeft, tooltipTop } = this.props;
    const { width, render } = this.state;

    // scales
    const xScale = scaleTime({
      range: [0, width],
      domain: extent(values, xValue)
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [0, max(values, yValue) + height / 3]
    });

    return (
      <Container innerRef={n => (this.container = n)}>
        {render ? (
          <svg ref={s => (this.svg = s)} width={width} height={height}>
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
              onMouseMove={data => event =>
                this.handleMouseMove({ data, event, xScale, yScale })}
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
        {tooltipData && (
          <Fragment>
            <Tooltip top={tooltipTop} left={tooltipLeft}>
              {tooltipData}
            </Tooltip>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default withTooltip(Chart);
