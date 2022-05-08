import React from "react";

import * as appBarStyles from "../../styles/ui/appbar.module.sass"

type AppbarProps = BaseProps & {
    title : string
}

const Appbar = (props: AppbarProps) => {
    return <div className={`${appBarStyles.appBar} ${props.className}`}>
        <div className={appBarStyles.toolbar}>
            {props.children}
            <h1 className={appBarStyles.title}>
                {props.title}
            </h1>
        </div>
    </div>
}

export default Appbar;
