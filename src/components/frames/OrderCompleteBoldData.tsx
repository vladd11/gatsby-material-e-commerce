import {css} from "@emotion/react";
import React from "react";

interface OrderCompleteBoldDataProps {
    children
}

export default function OrderCompleteBoldData(props: OrderCompleteBoldDataProps) {
    return <span css={css`
      font-weight: bold;
      padding-left: 4px;
    `}>
        {props.children}
    </span>
}