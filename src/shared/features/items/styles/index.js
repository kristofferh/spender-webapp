import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Loader as Spinner } from "@kristofferh/businesskit";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "shared/components/icons";
import { hexToRGBA } from "shared/utils/colors";
import {
  black,
  fontSizeSubhead,
  logan,
  mainContent,
  maxContainerWidthPx,
  minWidthMd,
  space,
  titleOne,
  titleThree,
  titleTwo,
  white,
  zIndex1,
  zIndex2,
} from "shared/utils/styles";

export const ItemsList = styled.section`
  ${mainContent()};
`;

export const Date = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSizeSubhead};
  text-transform: uppercase;
  font-weight: bold;
  margin: 0 -1rem 0.75rem;
  padding: 0.25rem 1rem;
  background: #fafafa;
  border-top: 1px solid ${hexToRGBA(black, 0.1)};
  border-bottom: 1px solid ${hexToRGBA(black, 0.1)};
  position: sticky;
  top: 0;

  @media (min-width: ${minWidthMd}) {
    position: relative;
    border-top: 0;
    background: transparent;
    margin: 2rem 0 1rem;
    padding: 0 0 10px;

    &:first-child {
      margin-top: 0;
    }
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
  font-variant-numeric: tabular-nums;
`;

export const Tags = styled.div`
  display: block;
  margin: 4px 0;
`;

export const ListItem = styled(Link)`
  display: block;
  padding-bottom: 0.75rem;
  text-decoration: none;
  color: inherit;

  & + & {
    border-top: 1px solid #eee;
    padding-top: 0.75rem;
  }
`;

export const ItemsContainer = styled.div`
  width: 100%;
`;

export const Container = styled.div``;

export const TotalAmount = styled.h2`
  ${titleTwo()};
  color: ${white};
  margin: 0 0 0.25rem;
`;

export const AvgAmount = styled.h3`
  ${titleThree()};
  color: ${white};
  margin: 0;
`;

export const AggregateDetails = styled.header`
  background: ${logan};
  text-align: center;
  position: relative;
  z-index: ${zIndex2};
`;

export const DetailsContainer = styled.div`
  padding: 1rem 2rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CurrentMonth = styled.h1`
  ${titleOne()};
  color: ${white};
  margin: 0 0 0.25rem;
`;

export const Add = styled(Link)`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  border-radius: 100%;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${white};
  font-weight: bold;
  background: linear-gradient(156deg, #a6a8bc 59%, #c7b1ba 99%);
  box-shadow: 0 2px 5px 1px ${hexToRGBA(space, 0.2)};
  z-index: ${zIndex1};
`;

export const ChartContainer = styled.div``;

export const TagList = styled.div`
  position: relative;
  max-width: ${maxContainerWidthPx};
  margin: 1rem auto;
`;

export const TagListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  position: relative;
  color: ${white};

  &:after {
    content: "";
    position: absolute;
    width: calc(100% - 1rem);
    left: 1rem;
    bottom: 0;
    border-bottom: 1px solid ${hexToRGBA(white, 0.2)};
  }

  &:first-child:before {
    content: "";
    position: absolute;
    width: calc(100% - 1rem);
    left: 1rem;
    top: 0;
    border-top: 1px solid ${hexToRGBA(white, 0.2)};
  }
`;

export const TagAmount = styled.div`
  font-variant-numeric: tabular-nums;
`;

export const TagName = styled.div`
  text-transform: capitalize;
`;

export const iconStyles = css`
  width: 35px;
  height: 35px;
  margin-top: -4px;
  cursor: pointer;
`;

export const LeftArrow = styled(ArrowLeft)`
  ${iconStyles};
  margin-right: 5px;
`;

export const RightArrow = styled(ArrowRight)`
  ${iconStyles};
  margin-left: 5px;
`;

export const NoItems = styled.div`
  padding: 1rem 0;

  @media (min-width: ${minWidthMd}) {
    padding: 0;
  }
`;

export const Loader = styled(Spinner)`
  margin: 0.75rem auto;
`;
