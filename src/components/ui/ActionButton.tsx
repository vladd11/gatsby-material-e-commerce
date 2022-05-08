import React from "react"
import * as actionButtonStyles from "../../styles/ui/action-button.module.sass"

type ActionButtonProps = BaseProps & {
    onClick?
}

export default function ActionButton(props: ActionButtonProps) {
    return <button className={`${actionButtonStyles.button} ${props.className}`}
                   onClick={props.onClick}>
        {props.children}
    </button>
}