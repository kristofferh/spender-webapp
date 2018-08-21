import { Link } from "react-router-dom";
import styled from "react-emotion";

import { zIndex1 } from "shared/utils/styles/z-index";
import { minWidthMd, shadowBox } from "shared/utils/styles/layout";
import { logan, white } from "shared/utils/styles/colors";
import {
  fontSizeSubhead,
  titleOne,
  titleTwo,
  titleThree,
  fontSizeCaptionTwo
} from "shared/utils/styles";

export const ItemsList = styled.section`
  margin: 0;
  padding: 0 15px;
  background: ${white};

  @media (min-width: ${minWidthMd}) {
    ${shadowBox};
    margin: 30px auto;
    max-width: 960px;
    padding: 20px 30px;
  }
`;

export const Date = styled.div`
  display: block;
  font-size: ${fontSizeSubhead};
  text-transform: uppercase;
  font-weight: bold;
  margin: 0 -15px 10px;
  padding: 4px 15px;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;

  @media (min-width: ${minWidthMd}) {
    position: relative;
    border-top: 0;
    background: transparent;
    margin: 0 0 15px;
    padding: 0 0 10px;
  }
`;

export const Details = styled.div`
  display: block;
`;

export const Description = styled.span`
  display: block;
`;

export const Amount = styled.span`
  display: block;
`;

export const Tags = styled.div`
  display: block;
  margin: 5px 0;
`;

export const Tag = styled.span`
  text-transform: uppercase;
  background: ${({ bgColor }) => (bgColor ? bgColor : "#aaa")};
  padding: 4px 7px 5px;
  border-radius: 2px;
  color: ${white};
  margin-right: 4px;
  font-size: ${fontSizeCaptionTwo};
  font-weight: bold;
`;

export const ListItem = styled(Link)`
  display: block;
  padding-bottom: 10px;
  text-decoration: none;
  color: inherit;

  & + & {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

export const ItemsContainer = styled.div`
  width: 100%;
`;

export const Container = styled.div``;

export const TotalAmount = styled.h2`
  ${titleTwo()};
  color: ${white};
  margin: 0 0 0.25em;
`;

export const AvgAmount = styled.h3`
  ${titleThree()};
  color: ${white};
  margin: 0;
`;

export const AggregateDetails = styled.div`
  background: ${logan};
  padding: 15px 30px 20px;
  text-align: center;
`;

export const CurrentMonth = styled.h1`
  ${titleOne()};
  color: ${white};
  margin: 0 0 0.25em;
`;

export const MobileAdd = styled(Link)`
  position: fixed;
  bottom: 15px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  background: cornflowerblue;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  background: linear-gradient(156deg, #a6a8bc 59%, #c7b1ba 99%);
  box-shadow: 0 2px 5px rgba(17, 17, 17, 0.1);
  z-index: ${zIndex1};

  @media (min-width: ${minWidthMd}) {
    display: none;
  }
`;
