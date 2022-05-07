import React, {createContext, useEffect, useState} from "react"
import * as speedDialStyles from "../../styles/ui/speed-dial.module.sass"

export const animationContext = createContext(false);

export default function SpeedDial({children, className, main, shown}) {
    const [isClosing, setClosing] = useState(false);
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        if (shown) {
            setDisplayed(true)
        } else {
            setClosing(!shown)
        }
    }, [shown])

    useEffect(() => {
        if(displayed) {
            setClosing(false)
        }
    }, [displayed])

    return <div className={`${speedDialStyles.speedDial} ${className}`}>
        <div className={speedDialStyles.dials} style={{
            display: (displayed) ? "flex" : "none",
        }} onTransitionEnd={() => setDisplayed(shown)}>

            <animationContext.Provider value={isClosing}>
                {children}
            </animationContext.Provider>
        </div>
        {main}
    </div>
}