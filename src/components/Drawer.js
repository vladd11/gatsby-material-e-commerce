import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as drawerStyles from "../styles/components/drawer.module.sass"


const Drawer = ({children, isDrawerOpened, onClose, shouldNotExpand}) => {
    return (
        <div
            className={drawerStyles.drawer}
            style={(isDrawerOpened || !shouldNotExpand) ? {display: "block"} : null}>
            <div className={drawerStyles.appBarList}>
                {(shouldNotExpand) ?
                    <div onClick={onClose} className={drawerStyles.closeDrawer}>
                        <ChevronLeftIcon/>
                    </div>
                    : null}

                {children}
            </div>
        </div>
    )
}

export default Drawer;