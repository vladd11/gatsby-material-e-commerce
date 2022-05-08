import React from "react";
import * as badgeStyles from "../../styles/ui/badges.module.sass"

type BadgeProps = BaseProps & {
    marker
}

export default function Badge(props: BadgeProps) {
    if (!props.marker) return props.children;

    return <div className={`${badgeStyles.badge} ${props.className}`}>
        <div className={badgeStyles.badgeMarker}>
            {props.marker}
        </div>
        {props.children}
    </div>
}
