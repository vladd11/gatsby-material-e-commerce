import React from "react";
import * as iconButtonStyles from "../styles/ui/icon-button.module.sass"


const IconButton = ({children, onClick}) => {
    return <div
        className={iconButtonStyles.iconButton}
        onClick={onClick}>
        {children}
    </div>
}

export default IconButton
