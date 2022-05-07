import React, {useEffect, useRef, useState} from "react";
import * as inputStyles from "../../styles/ui/input.module.sass"

export default function Input({id, onChange, type, value, className, children}) {
    const [isFocused, setFocused] = useState(false)
    const [isEmpty, setEmpty] = useState(!!value)

    useEffect(() => setEmpty(!!value), [value])

    const input = useRef(null)

    return <div className={`${inputStyles.form} ${className}`}
                onFocus={(e) => {
                    e.preventDefault()
                    input.current.focus()
                    setFocused(true)
                }}
                onBlur={(e) => {
                    e.preventDefault()
                    input.current.blur()
                    setFocused(false)
                }}
                tabIndex={0}>

        <label htmlFor={id} className={inputStyles.label}
               style={(isFocused || isEmpty)
                   ? {transform: "translate(14px, -9px) scale(0.75)", color: (isFocused) ? "#556cd6" : null}
                   : {transform: "translate(14px, 16px) scale(1)"}}>
            {children}
        </label>
        <div className={inputStyles.holder}>
            <input className={inputStyles.field} type={type} id={id} aria-describedby={type} value={value}
                   onChange={(e) => {
                       if (e.target.value) {
                           setEmpty(false)
                       } else setEmpty(true)

                       onChange(e)
                   }}

                   ref={input}
                   style={(isFocused) ? {borderBottom: "2px solid #556cd6"} : null}
            />
        </div>
    </div>
}