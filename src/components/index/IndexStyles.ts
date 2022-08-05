import styled from "@emotion/styled";
import queries from "../../queries";

export const Categories = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  padding: 16px 0 0 0;
`;

export const Products = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${queries.mobile} {
    justify-content: center
  }
`;