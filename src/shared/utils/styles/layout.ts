import { gray, inputGradient, white } from "./colors";

export const size = 16;
export const sizePx = sizeToPx(size);
export const doubleSize = size * 2;
export const tripleSize = size * 3;
export const halfSize = size / 2;
export const maxWidthSm = "575px";
export const minWidthSm = "576px";
export const maxWidthMd = "767px";
export const minWidthMd = "768px";
export const maxWitdhLg = "991px";
export const minWidthLg = "992px";

export const borderRadiusSubtle = "2px";

export function sizeToPx(size: number) {
  return `${size}px`;
}

export const shadowBox = () => `
  background: ${white};
  box-shadow: 0 2px 5px rgba(17, 17, 17, 0.1);
  border-radius: ${borderRadiusSubtle};
`;

export const elevation = () => `
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1), 
  0 1px 10px 0 rgba(0, 0, 0, 0.1);`;

export const pageContainer = () => `
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const mainContainer = () => `
  padding: 0 ${sizeToPx(size)};
  width: 100%;
  
  @media (min-width: ${minWidthMd}) {
    max-width: 960px;
    margin: ${sizeToPx(tripleSize)} auto;
  }
`;

export const mainContent = () => `
  ${mainContainer()};
  margin: 0;
  background: ${white};

  @media (min-width: ${minWidthMd}) {
    ${shadowBox()};
    padding: ${doubleSize}px ${tripleSize}px;
  }
`;

export const flatInput = () => `
  appearance: none;
  border-radius: 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${gray};
  padding: 5px 0;
  min-height: 40px;
  font-family: inherit;
  font-size: inherit;

  &:focus {
    outline: none;
    border-image: ${inputGradient} 2;
  }
`;
