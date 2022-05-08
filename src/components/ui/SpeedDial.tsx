import React, {createContext, useEffect, useState} from "react"
import * as speedDialStyles from "../../styles/ui/speed-dial.module.sass"

export const animationContext = createContext(false);

type SpeedDialProps = BaseProps & {
    main, // Main action button, that will cause another buttons to open
    shown?: boolean
}

export default function SpeedDial(props: SpeedDialProps) {
    const [isClosing, setClosing] = useState(false);
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        if (props.shown) {
            setDisplayed(true)
        } else {
            setClosing(!props.shown)
        }
    }, [props.shown])

    useEffect(() => {
        if (displayed) {
            setClosing(false)
        }
    }, [displayed])

    return <div className={`${speedDialStyles.speedDial} ${props.className}`}>
        <div className={speedDialStyles.dials} style={{
            display: (displayed) ? "flex" : "none",
        }} onTransitionEnd={() => setDisplayed(props.shown)}>

            <animationContext.Provider value={isClosing}>
                {props.children}
            </animationContext.Provider>
        </div>
        {props.main}
    </div>
}