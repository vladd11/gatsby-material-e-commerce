import React from "react"
import * as actionButtonStyles from "../../styles/ui/action-button.module.sass"

export default function ActionButton({children, className, onClick}) {
    return <button className={`${actionButtonStyles.button} ${className}`}
                   onClick={onClick}>
        {children}
    </button>
}