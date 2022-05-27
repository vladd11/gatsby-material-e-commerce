import React from "react";
import {css} from "@emotion/react";

type ChipProps = {
    avatar?,
    disabled?,
    label,
    onClick: () => void
}

export default function Chip(props: ChipProps) {
    return <div css={css`
      padding: 8px;
      margin-bottom: 16px;

      border-radius: 16px;

      background: rgba(0, 0, 0, 0.08);
      opacity: ${(props.disabled) ? 0.38 : 1};

      min-width: 128px;

      display: inline-flex;
      justify-content: center;
      flex-direction: column;

      cursor: ${(props.disabled) ? "auto" : "pointer"};
    `}
    onClick={props.onClick}>
        <span css={css`
          width: 100%;
          height: 100%;
          
          padding-bottom: 4px;

          display: flex;
          justify-content: center;

          svg {
            max-height: 72px;
          }
        `}>
            {props.avatar}
        </span>
        <span css={css`
          margin: auto;
          padding-left: 12px;
          padding-right: 12px;
          white-space: nowrap;

          color: rgba(0, 0, 0, 0.87);
        `}>
            {props.label}
        </span>
    </div>
}