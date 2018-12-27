import { white, inputGradient } from "./colors";

export const maxWidthSm = "575px";
export const minWidthSm = "576px";
export const maxWidthMd = "767px";
export const minWidthMd = "768px";
export const maxWitdhLg = "991px";
export const minWidthLg = "992px";

export const borderRadiusSubtle = "2px";

export const shadowBox = () => `
  background: ${white};
  box-shadow: 0 2px 5px rgba(17, 17, 17, 0.1);
  border-radius: ${borderRadiusSubtle};
`;

export const mainContainer = () => `
  padding: 0 15px;

  @media (min-width: ${minWidthMd}) {
    max-width: 960px;
    margin: 30px auto;
  }
`;

export const mainContent = () => `
  ${mainContainer()};
  margin: 0;
  background: ${white};

  @media (min-width: ${minWidthMd}) {
    ${shadowBox()};
    padding: 20px 30px;
  }
`;

export const flatInput = () => `
  appearance: none;
  border-radius: 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #888;
  padding: 5px 0;
  min-height: 40px;

  &:focus {
    outline: none;
    border-image: ${inputGradient} 2;
  }
`;
