import React from "react"
import {css} from "@emotion/react";
import {Link} from "gatsby";

import {BaseProps} from "./BaseProps";

const Wrapper = (props: WrapperProps) => {
    const {component, state, selected, disabled, className, children, ...rest} = props;

    return <div style={(props.selected) ? {background: "rgba(85, 108, 214, 0.08)"} : undefined}>
        <props.component css={css`
          display: flex;
          align-items: center;

          padding: 8px 16px;

          text-decoration: none;
          color: #000;

          ${(disabled) ? `
          pointer-events: none;
          opacity: 0.38;
          cursor: not-allowed;` : ""}
          
          &:hover {
            background: rgba(0, 0, 0, 0.04)
          }
        `}
                         className={className}
                         state={state}
                         {...rest}>
            {props.children}
        </props.component>
    </div>
}

const ListItemLink = (props: ListItemLinkProps) => {
    if (props.isExternalLink) {
        return <Wrapper component="a"
                        disabled={props.disabled}
                        selected={props.selected}
                        href={props.to}
                        className={props.className}>
            {props.children}
        </Wrapper>;
    } else {
        return <Wrapper component={Link}
                        disabled={props.disabled}
                        selected={props.selected}
                        to={props.to}
                        state={props.state}
                        className={props.className}>
            {props.children}
        </Wrapper>;
    }
}

type WrapperProps = BaseProps & {
    selected?: boolean,
    disabled?: boolean,
    state?: any,

    component: any,
    [x: string]: any
}

type ListItemLinkProps = BaseProps & {
    to: string,

    disabled?: boolean,
    selected?: boolean,
    state?: any,

    isExternalLink?: boolean
}

export default ListItemLink