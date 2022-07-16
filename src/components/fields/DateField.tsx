import React from "react";

import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

import FieldProps from "./FieldProps";

export default function DateField(props: FieldProps) {
    return <FormControl
        sx={{
            mt: '16px',
            width: "100%",
            minWidth: "112px",
            flex: 1,
        }}
        required={true}
        error={!props.valid}>
        <Input
            readOnly={props.lock}
            type="date"
            id="time"
            aria-describedby="date"
            sx={{pl: 1}}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
        />
    </FormControl>
}