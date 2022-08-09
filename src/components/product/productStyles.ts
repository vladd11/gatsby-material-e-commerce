import styled from "@emotion/styled";
import theme from "../../theme";
import queries from "../../queries";

export const ShortDescription = styled.span`
  flex: 3;

  * {
    margin: auto;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 280px;
  margin: 20px;

  overflow: hidden;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 0 16px 16px;

  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

export const Title = styled.div`
  padding: 16px;
  font-size: 1.5rem;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 8px;

  border: none;
  outline: none;

  line-height: 1.75;
  text-transform: uppercase;

  background: #fff;
  color: ${theme.palette.primary.main};

  &:disabled {
    color: rgba(0, 0, 0, 0.26)
  }

  ${queries.mobile} {
    max-width: 100%;
  }
`

export const PriceElement = styled.span`
  flex: 2;
  margin: auto;
`;