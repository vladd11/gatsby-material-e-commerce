import React from "react"
import * as actionButtonStyles from "../../styles/ui/action-button.module.sass"

export default function ActionButton({children, onClick, color}) {
    return <button className={actionButtonStyles.button}
                   style={{background: color}}
                   onClick={onClick}>
        {children}
    </button>
}