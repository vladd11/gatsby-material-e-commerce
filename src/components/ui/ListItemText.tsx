import React from 'react'
import * as textStyles from '../../styles/ui/list-item-text.module.sass'

const ListItemText = (props: ListItemTextProps) => {
    return <span className={textStyles.root}>
        <div className={textStyles.text}>{props.children}</div>

        {(props.secondary) ? <span className={textStyles.secondaryText}>
            {props.secondary}
        </span> : null}
    </span>
}

interface ListItemTextProps {
    secondary?,
    children,
}

export default ListItemText
