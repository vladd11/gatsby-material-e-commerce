import {css} from "@emotion/react";
import React, {ReactNode} from "react";

interface OrderCompleteBoldDataProps {
    children: ReactNode
}

export default function OrderCompleteBoldData(props: OrderCompleteBoldDataProps) {
    return <span css={css`
      font-weight: bold;
      padding-left: 4px;
    `}>
        {props.children}
    </span>
}