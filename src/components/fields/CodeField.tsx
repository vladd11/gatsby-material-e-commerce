import React from "react";

import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import FieldProps from "./FieldProps";

export default function CodeField(props: FieldProps & { onApply: (oldValue: string) => void }) {
    return <FormControl
        required={true}
        style={{width: "100%"}}
        error={!props.valid}
        sx={{mt: '8px', mb: '8px'}}>

        <InputLabel htmlFor="phone">Код</InputLabel>
        <Input inputMode="numeric" id="phone" aria-describedby="code" sx={{pl: 1}} value={props.value}
               onChange={event => {
                   const value = event.target.value;
                   props.onChange(value);

                   let timerLock = false;

                   if (value.length === 6 && !timerLock) {
                       timerLock = true;
                       setTimeout(async () => {
                           props.onApply(value)
                           timerLock = false;
                       }, 1000)
                   }
               }}/>
        <FormHelperText>
            {(props.valid) ? "Код будет проверен автоматически." : props.error}
        </FormHelperText>
    </FormControl>
}
