import {formStyle} from "../order/OrderStyles";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {css} from "@emotion/react";
import FormControl from "@mui/material/FormControl";

import React from "react";

import FieldProps from "../order/fields/FieldProps";
import FormHelperText from "@mui/material/FormHelperText";

export default function PhoneField(props: FieldProps) {
    return <FormControl
        sx={formStyle}
        required={true}
        error={!props.valid}>
        <InputLabel htmlFor="phone">Номер телефона</InputLabel>
        <Input
            readOnly={props.lock}
            inputMode="tel"

            id="phone"
            aria-describedby="tel"
            sx={{pl: 1}}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
            startAdornment={<span css={css`padding-right: 8px`}>+7</span>}
        />
        {(!props.valid && props.error)
            ? <FormHelperText>
                {props.error}
            </FormHelperText>
            : null
        }
    </FormControl>
}