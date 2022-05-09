import React from 'react'
import {css} from "@emotion/react";

type ListItemTextProps = BaseProps & {
    secondary?
}

export default function ListItemText(props: ListItemTextProps) {
    return <span className={props.className} css={css`
      margin: 4px 0;
    `}>
        <div css={css`
          line-height: 1.5;
        `}>{props.children}</div>

        {(props.secondary) ? <span css={css`
          font-size: 0.875rem;
          line-height: 1.43;
          color: rgba(0, 0, 0, 0.6);
        `}>
            {props.secondary}
        </span> : null}
    </span>
}
