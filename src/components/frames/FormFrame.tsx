import React, {ReactNode} from "react";
import {css, Global} from "@emotion/react";

import * as orderStyles from "../../styles/components/order.module.sass";
import Appbar from "../ui/Appbar";
import UseFont from "./UseFont";

interface OrderFrameProps {
    title: ReactNode,
    children?: ReactNode
}

export default function FormFrame(props: OrderFrameProps) {
    return <>
        <UseFont />
        <Global styles={css`body {
          background: #03a9f4
        }`}/>
        <div className={orderStyles.order}>
            <Appbar title={props.title}/>
            {props.children}
        </div>
    </>
}