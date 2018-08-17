import { Link } from "react-router-dom";
import styled from "react-emotion";

export const Date = styled.div`
  display: block;
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
  font-size: 10px;
  font-weight: bold;
`;

export const ListItem = styled(Link)`
  display: block;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
  text-decoration: none;
  color: inherit;
`;

export const ItemsContainer = styled.div`
  width: 100%;
`;

export const TotalAmount = styled.h2`
  margin: 0 0 0.25em;
  font-size: 20px;
`;

export const AvgAmount = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const AggregateDetails = styled.div`
  margin: 10px 0;
`;

export const CurrentMonth = styled.h1`
  margin: 0 0 0.25em;
  font-size: 20px;
`;
