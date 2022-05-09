import React from "react";
import {css} from "@emotion/react";

type BadgeProps = BaseProps & {
    marker
}

export default function Badge(props: BadgeProps) {
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
