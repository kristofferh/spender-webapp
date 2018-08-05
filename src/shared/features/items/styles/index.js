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
