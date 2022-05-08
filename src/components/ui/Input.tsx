import React, {useEffect, useRef, useState} from "react";
import * as inputStyles from "../../styles/ui/input.module.sass"

type InputProps = BaseProps & {
    id?: string,
    onChange?,
    type?: string,
    value?,
    error?
}

export default function Input(props: InputProps) {
    const [isFocused, setFocused] = useState(false)
    const [isEmpty, setEmpty] = useState(!!props.value)

    useEffect(() => setEmpty(!!props.value), [props.value])

    const input = useRef(null)

    return <div className={`${inputStyles.form} ${props.className}`}
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

        <label htmlFor={props.id} className={`${inputStyles.label} ${(props.error) ? inputStyles.labelDisabled : null}`}
               style={(isFocused || isEmpty)
                   ? {transform: "translate(14px, -9px) scale(0.75)", color: (isFocused) ? "#556cd6" : null}
                   : {transform: "translate(14px, 16px) scale(1)"}}>
            {props.children}
        </label>
        <div className={inputStyles.holder}>
            <input className={inputStyles.field}
                   type={props.type}
                   id={props.id}
                   aria-describedby={props.type}
                   value={props.value}
                   onChange={(e) => {
                       if (e.target.value) {
                           setEmpty(false)
                       } else setEmpty(true)

                       props.onChange(e)
                   }}

                   ref={input}
                   style={{
                       borderBottom: (isFocused)
                           ? `2px solid ${(props.error) ? "#FF1744" : "#556cd6"}`
                           : (props.error) ? "2px solid #FF1744" : null
                   }}
            />
        </div>
    </div>
}