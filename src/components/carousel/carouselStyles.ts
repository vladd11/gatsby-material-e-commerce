import styled from "@emotion/styled"
import queries from "../../queries"

export const Root = styled.div`
  position: relative;
  
  &:hover .icon {
    display: inline-block;
  }
  
  ${queries.mobile} {
    .icon {
      display: block;
    }
  }
`;

export const Elements = styled.div`
  overflow: hidden;
  scroll-behavior: smooth;

  display: flex;
  flex-direction: row;
`;
