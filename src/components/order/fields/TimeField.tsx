import React from "react";

import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

import {formStyle} from "../OrderStyles";
import FieldProps from "./FieldProps";

export default function TimeField(props: FieldProps) {
    return <FormControl
        sx={{
            ...formStyle,
            flex: 2,
            minWidth: "81px"
        }}
        required={true}
        error={!props.valid}>
        <Input
            readOnly={props.lock}
            type="time"
            id="time"
            aria-describedby="time"
            sx={{pl: 1}}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
        />
    </FormControl>;
}