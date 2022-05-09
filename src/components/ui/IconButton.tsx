import React from "react";
import {css} from "@emotion/react";

type IconButtonProps = BaseProps & {
    onClick?
    [x: string]: any
}

const IconButton = (props: IconButtonProps) => {
    const {children, className, onClick, ...rest} = props;

    return <button
        css={css`
          border: none;
          padding: 12px;
          margin: 0 16px 0 0;

          color: #fff;
          background: transparent;

          display: inline-flex;

          cursor: pointer;`}
        className={className}
        onClick={onClick}
        {...rest}>
        {children}
    </button>
}

export default IconButton
