import React from "react";

import * as appBarStyles from "../styles/ui/appbar.module.sass"

const Appbar = ({title, children}) => {
  return <div className={appBarStyles.appBar}>
            <div className={appBarStyles.toolbar}>
                {children}
                <h1 className={appBarStyles.title}>
                    {title}
                </h1>
            </div>
        </div>
}

export default Appbar;
