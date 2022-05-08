import React from "react"
import * as speedDialStyles from "../../styles/ui/speed-dial.module.sass"
import {animationContext} from "./SpeedDial";

type SpeedDialProps = BaseProps & {
    tooltipText?,
    onClick?
}

export default function SpeedDialButton(props: SpeedDialProps) {
    const context = React.useContext(animationContext)

    return <button className={`${speedDialStyles.button} ${props.className}`}
                   style={{transform: (context) ? "scale(0)" : "scale(1)"}} onClick={props.onClick}>
        <span className={speedDialStyles.tooltip}>
            {props.tooltipText}
        </span>
        {props.children}
    </button>
}