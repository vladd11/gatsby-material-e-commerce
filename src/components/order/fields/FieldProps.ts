import {ReactNode} from "react";

export default interface FieldProps {
    valid: boolean,
    lock: boolean,

    value: string,
    onChange: (value: string) => void,
    error?: ReactNode
}
