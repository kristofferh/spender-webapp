import React, { CSSProperties } from "react";
import { Circle, Container, LoaderOuterContainer } from "./styles";

interface Props {
  backgroundColor?: string;
  borderWidth?: number;
  color?: string;
  size?: number;
  style?: CSSProperties;
}

export const Loader: React.FC<Props> = ({
  color,
  style,
  size,
  borderWidth,
  backgroundColor
}) => {
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

export default Loader;
