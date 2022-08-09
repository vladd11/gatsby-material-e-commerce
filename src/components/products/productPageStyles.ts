import styled from "@emotion/styled";
import queries from "../../queries";

export const Root = styled.div`
  display: flex;
  flex-direction: column;

  ${queries.large} {
    flex-direction: row;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${queries.large} {
    height: 100%;
    flex-direction: column;
    text-align: center;
  }
`

export const Segment = styled.div`
  ${queries.large} {
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const Description = styled.div`
  word-break: break-word;

  * {
    padding-left: 16px;
  }

  ul {
    margin: 0;
    padding-left: 0;

    list-style: none;

    li {
      padding-left: 2.5em;
      height: 32px;
      width: 100%;

      display: inline-flex;
      align-items: center;

      :hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;