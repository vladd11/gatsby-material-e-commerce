import React from "react";
import * as iconButtonStyles from "../../styles/ui/icon-button.module.sass"

type IconButtonProps = BaseProps & {
    onClick?
    [x: string]: any
}

const IconButton = (props: IconButtonProps) => {
    const {children, className, onClick, ...rest} = props;

    return <button
        className={`${iconButtonStyles.iconButton} ${className}`}
        onClick={onClick}
        {...rest}>
        {children}
    </button>
}

export default IconButton
