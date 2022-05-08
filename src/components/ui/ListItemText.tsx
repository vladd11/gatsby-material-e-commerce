import React from 'react'
import * as textStyles from '../../styles/ui/list-item-text.module.sass'

type ListItemTextProps = BaseProps & {
    secondary?
}

export default function ListItemText(props: ListItemTextProps) {
    return <span className={`${textStyles.root} ${props.className}`}>
        <div className={textStyles.text}>{props.children}</div>

        {(props.secondary) ? <span className={textStyles.secondaryText}>
            {props.secondary}
        </span> : null}
    </span>
}
