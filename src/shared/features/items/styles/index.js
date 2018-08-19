import { Link } from "react-router-dom";
import styled from "react-emotion";

import {
  fontSizeSubhead,
  titleOne,
  titleTwo,
  titleThree,
  fontSizeCaptionTwo
} from "shared/utils/styles";

export const ItemsList = styled.section`
  margin: 15px 0;
`;

export const Date = styled.div`
  display: block;
  font-size: ${fontSizeSubhead};
  text-transform: uppercase;
  font-weight: bold;
  margin: 0 -15px 10px;
  padding: 0.25em 15px;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
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
  color: #fff;
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

export const Container = styled.div`
  margin: 15px 0;
`;

export const TotalAmount = styled.h2`
  ${titleTwo()};
  color: #fff;
  margin: 0 0 0.25em;
`;

export const AvgAmount = styled.h3`
  ${titleThree()};
  color: #fff;
  margin: 0;
`;

export const AggregateDetails = styled.div`
  background: #a1a4ba;
  padding: 15px;
  margin: 0 -15px 15px;
`;

export const CurrentMonth = styled.h1`
  ${titleOne()};
  color: #fff;
  margin: 0 0 0.25em;
`;
