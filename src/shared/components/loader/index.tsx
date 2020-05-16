import React from "react";
import PropTypes from "prop-types";

import { Circle, Container, LoaderOuterContainer } from "./styles";

const Loader = ({ color, style, size, borderWidth, backgroundColor }) => {
  return (
    <LoaderOuterContainer>
      <Container
        containerSize={size}
        borderWidth={borderWidth}
        backgroundColor={backgroundColor}
        style={style}
      >
        <Circle height={size} width={size} viewBox="0 0 41 41">
          <path
            strokeWidth={borderWidth}
            stroke={color}
            fill="none"
            d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38"
          />
        </Circle>
      </Container>
    </LoaderOuterContainer>
  );
};

Loader.defaultProps = {
  backgroundColor: "#dedede",
  borderWidth: 6,
  color: "#53b3d4",
  size: 40
};

Loader.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  borderWidth: PropTypes.number,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.object
};

export default Loader;
