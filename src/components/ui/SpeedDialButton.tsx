import React from "react"
import * as speedDialStyles from "../../styles/ui/speed-dial.module.sass"
import {animationContext} from "./SpeedDial";

export default function SpeedDialButton({children, tooltipText, onClick}) {
    const context = React.useContext(animationContext)

    return <button className={speedDialStyles.button} style={{transform: (context) ? "scale(0)" : "scale(1)"}} onClick={onClick}>
        <span className={speedDialStyles.tooltip}>
            {tooltipText}
        </span>
        {children}
    </button>
}