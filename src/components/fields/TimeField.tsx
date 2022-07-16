import React from "react";

import Slider from "@mui/material/Slider";
import {getTimeByRemainingDayPercent} from "../../currentDateTime";

const minDistance = 25;

export default function TimeField(props: {
    value: number[], onChange: (value: number[]) => void
}) {
    return <Slider
        sx={{
            flex: 2,
            ml: "16px",
            mr: "16px"
        }}

        getAriaLabel={() => 'Temperature range'}
        value={props.value}
        onChange={(event, newValue, activeThumb) => {
            if (!Array.isArray(newValue)) {
                return;
            }

            if (newValue[1] - newValue[0] < minDistance) {
                if (activeThumb === 0) {
                    const clamped = Math.min(newValue[0], 100 - minDistance);
                    props.onChange([clamped, clamped + minDistance]);
                } else {
                    const clamped = Math.max(newValue[1], minDistance);
                    props.onChange([clamped - minDistance, clamped]);
                }
            } else {
                props.onChange(newValue as number[]);
            }
        }}
        valueLabelDisplay="on"

        valueLabelFormat={getTimeFromPercent}
        getAriaValueText={getTimeFromPercent}
        disableSwap
    />
}

function getTimeFromPercent(percent: number): string {
    const {hours, minutes} = getTimeByRemainingDayPercent(percent)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}