import React from "react";
import {css} from "@emotion/react";

import {BaseProps} from "./BaseProps";

type BadgeProps = Omit<BaseProps, "children"> & {
    marker: any,
    children: JSX.Element
}

export default function Badge(props: BadgeProps): JSX.Element {
    if (!props.marker) return props.children;

    return <div className={props.className} css={css`
      position: relative;
      display: inline-flex;
    `}>
        <div css={css`
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);

          width: 20px;
          height: 20px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 50%;

          font-size: 0.75rem;

          background: #ff1744;
        `}>
            {props.marker}
        </div>
        {props.children}
    </div>
}
