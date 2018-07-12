import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "react-emotion";

const buttonSpin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: center center;
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
    transform-origin: center center;
  }
`;

const LoaderOuterContainer = styled.div`
  vertical-align: middle;
  position: relative;
`;

const Container = styled.div`
  margin: 10px auto;
  border: ${({ borderWidth }) => borderWidth}px solid
    ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  width: ${({ containerSize }) => containerSize}px;
  height: ${({ containerSize }) => containerSize}px;
`;

const Circle = styled.svg`
  animation: ${buttonSpin} 0.9s infinite cubic-bezier(0.08, 0.03, 1, 1.04);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  left: 50%;
  top: 50%;
`;

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
