import React from "react"
import * as inputHelperStyles from "../../styles/ui/input-helper.module.sass"

type InputHelperProps = BaseProps & {
    error: boolean
}

export default function InputHelper(props: InputHelperProps) {
    return <span className={`${inputHelperStyles.root} ${props.className}`} style={(props.error) ? {
        color: "#FF1744"
    }: null}>
        {props.children}
    </span>
}