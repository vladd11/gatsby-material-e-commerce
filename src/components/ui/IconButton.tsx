import React from "react";
import * as iconButtonStyles from "../../styles/ui/icon-button.module.sass"


const IconButton = ({children, onClick, ...rest}) => {
    return <button
        className={iconButtonStyles.iconButton}
        onClick={onClick}
        {...rest}>
        {children}
    </button>
}

export default IconButton
