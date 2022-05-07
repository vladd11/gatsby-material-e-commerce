import * as listItemButton from "../../styles/ui/list-item-button.module.sass"

import React from "react"
import {Link} from "gatsby";

const Wrapper = (props: WrapperProps) => {
    const {component, selected, disabled, children, ...rest} = props;

    return <div style={(props.selected) ? {background: "rgba(85, 108, 214, 0.08)"} : null}>
        <props.component className={listItemButton.itemButton}
                         style={(props.disabled) ? {opacity: '0.38', cursor: "not-allowed"} : null}
                         {...rest}>
            {props.children}
        </props.component>
    </div>
}

const ListItemLink = (props: ListItemLinkProps) => {
    if (props.isExternalLink) {
        return <Wrapper component="a" disabled={props.disabled} selected={props.selected} href={props.to}>
            {props.children}
        </Wrapper>;
    } else {
        return <Wrapper component={Link} disabled={props.disabled} selected={props.selected} to={props.to}>
            {props.children}
        </Wrapper>;
    }
}

type WrapperProps = {
    selected: boolean,
    disabled: boolean,

    component,
    children,
    [x:string]: any
}

interface ListItemLinkProps {
    children,
    to: string,

    disabled?: boolean,
    selected?: boolean,

    isExternalLink?: boolean
}

export default ListItemLink