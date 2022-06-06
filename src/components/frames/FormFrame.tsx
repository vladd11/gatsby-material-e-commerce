import React, {ReactNode} from "react";
import {css, Global} from "@emotion/react";

import * as orderStyles from "../../styles/components/order.module.sass";
import Appbar from "../ui/Appbar";

interface OrderFrameProps {
    title: ReactNode,
    children?: ReactNode
}

export default function FormFrame(props: OrderFrameProps) {
    return <>
        <Global styles={css`body {
          background: #03a9f4
        }`}/>
        <div className={orderStyles.order}>
            <Appbar title={props.title}/>
            {props.children}
        </div>
    </>
}