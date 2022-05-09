import React, {createContext, useEffect, useState} from "react"
import {css} from "@emotion/react";

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

    return <div className={props.className} css={css`
      z-index: 2;

      display: flex;
      flex-direction: column;

      margin: 12px;`}>
        <div css={css`
          margin-bottom: 8px;

          display: ${(displayed) ? "flex" : "none"};
          align-items: end;
          flex-direction: column;
        `} onTransitionEnd={() => setDisplayed(props.shown)}>

            <animationContext.Provider value={isClosing}>
                {props.children}
            </animationContext.Provider>
        </div>
        {props.main}
    </div>
}