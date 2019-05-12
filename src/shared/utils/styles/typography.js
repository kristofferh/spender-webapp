export const fontFamilySerifSemibold = "'tiempos-semibold', georgia, serif";
export const fontFamilySerifSemiboldHeadline =
  "'tiempos-head-semibold', georgia, serif";

export const fontSizeCaptionTwo = "11px";
export const fontSizeCaptionOne = "12px";
export const fontSizeFootnote = "13px";
export const fontSizeSubhead = "15px";
export const fontSizeCallout = "16px";
export const fontSizeBody = "17px";
export const fontSizeHeadline = "17px";
export const fontSizeTitleThree = "20px";
export const fontSizeTitleTwo = "22px";
export const fontSizeTitleOne = "28px";
export const fontSizeLargeTitle = "34px";

export const fontWeightBold = "bold";

export const titleOne = () => `
  font-family: ${fontFamilySerifSemiboldHeadline};
  font-size: ${fontSizeTitleOne};
  line-height: 1.2;
`;

export const titleTwo = () => `
  font-family: ${fontFamilySerifSemiboldHeadline};
  font-size: ${fontSizeTitleTwo};
  line-height: 1.25;
`;

export const titleThree = () => `
  font-family: ${fontFamilySerifSemiboldHeadline};
  font-size: ${fontSizeTitleThree};
  line-height: 1.25;
`;

export const boldText = () => `
  font-weight: ${fontWeightBold};
  font-size: ${fontSizeCallout};
`;

export const subHead = () => `
  font-weight: ${fontWeightBold};
  font-size: ${fontSizeSubhead};
  text-transform: uppercase;  
`;
