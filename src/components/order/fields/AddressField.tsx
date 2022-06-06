import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

import React, {ReactNode} from "react";
import FieldProps from "./FieldProps";
import * as orderStyles from "../../../styles/components/order.module.sass";
import Button from "@mui/material/Button";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

interface AddressFieldProps {
    isManual: boolean,
    onTypeChange: (value: boolean) => void,

    value: string,
    onChange: (value: string) => void,

    valid: boolean,
    lock: boolean,

    children: ReactNode
}

export default function AddressField(props: AddressFieldProps) {
    return <div className={orderStyles.addressInput}>
        <Button sx={{width: "100%", textTransform: "initial"}}
                onClick={() => props.onTypeChange(!props.isManual)}>
            {(props.isManual) ? "Указать позицию на карте" : "Указать адрес вручную"}
        </Button>

        {(props.isManual)
            ? <ManualAddressField value={props.value} onChange={props.onChange} valid={props.valid} lock={props.lock}/>
            : null}

        <div className={orderStyles.container}
             style={(props.isManual) ? {display: 'none'} : undefined}>

            {props.children}
            <PlaceOutlinedIcon sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                paddingBottom: "48px",

                fontSize: "48px"
            }}/>
        </div>
    </div>
}

function ManualAddressField(props: FieldProps) {
    return <FormControl sx={{mt: '8px', mb: '64px', width: "100%"}}
                        required={true}
                        error={!props.valid}>
        <InputLabel htmlFor="address">Адрес доставки</InputLabel>
        <Input
            readOnly={props.lock}
            id="address"
            aria-describedby="address"
            sx={{pl: 1}}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}/>
    </FormControl>
}