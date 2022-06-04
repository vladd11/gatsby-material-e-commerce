import {css, Global} from "@emotion/react";
import React from "react";

export default function UseFont() {
    return <Global styles={css`
      body {
        font-family: -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        "Helvetica Neue",
        Arial,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol";
      }
    `}/>
}