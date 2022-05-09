import React from "react"
import {css} from "@emotion/react";

type ListItemIconProps = BaseProps

const ListItemIcon = (props: ListItemIconProps) => {
    return <div className={props.className} css={css`
      min-width: 56px;
      height: 24px;

      display: flex;
      align-items: center;

      color: rgba(0, 0, 0, 0.54);
    `}>
        {props.children}
    </div>
}

export default ListItemIcon