import React, { Component } from "react";
import PropTypes from "prop-types";

import { white } from "shared/utils/styles";

import { Overlay, Container, Toggle, Arrow } from "./styles";

export default class ChartOverlay extends Component {
  static propTypes = {
    initialDisplay: PropTypes.bool,
    children: PropTypes.any,
  };

  state = {
    display: this.props.initialDisplay,
    height: "auto",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.container) {
      window.addEventListener("resize", this.setDimensions);
      this.setDimensions();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions);
  }

  setDimensions = () => {
    const offset = this.container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    this.setState({
      height: windowHeight - offset.top,
    });
  };

  toggle = () => {
    this.setState({
      display: !this.state.display,
    });
  };

  render() {
    return (
      <Overlay ref={(node) => (this.container = node)}>
        <Container height={this.state.display ? this.state.height : 0}>
          {this.props.children}
        </Container>
        <Toggle active={this.state.display} onClick={this.toggle}>
          <Arrow active={this.state.display} color={white} />
        </Toggle>
      </Overlay>
    );
  }
}
