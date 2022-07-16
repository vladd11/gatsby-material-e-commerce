import {css} from "@emotion/react";
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

export const controlsStyles = css`
  position: absolute;
  top: 0;

  display: none;

  height: 100%;
  width: 72px;

  color: black;

  transition: opacity 300ms, background 300ms;

  &:hover {
    background: rgba(185, 185, 185, 0.37);
  }
`;
