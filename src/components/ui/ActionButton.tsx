import React from "react"
import {css} from "@emotion/react";

type ActionButtonProps = BaseProps & {
    onClick?,
    ariaLabel?
}

export default function ActionButton(props: ActionButtonProps) {
    return <button css={css`
      padding: 0;
      border: 0;

      color: #fff;

      border-radius: 50%;

      width: 40px;
      height: 40px;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0px, rgb(0 0 0 / 12%) 0 1px 18px 0px;
    `}
                   className={props.className}
                   onClick={props.onClick}
                   aria-label={props.ariaLabel}>
        {props.children}
    </button>
}