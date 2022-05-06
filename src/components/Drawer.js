import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as drawerStyles from "../styles/components/drawer.module.sass"


const Drawer = ({children, anchor, isDrawerOpened, onOpen, onClose, sx, shouldNotExpand}) => {
    return (
        <div
            className={drawerStyles.drawer}
            style={(isDrawerOpened) ? {display: "block"} : null}>
            <div className={drawerStyles.appBarList}>
                {(shouldNotExpand) ?
                    <div onClick={onClose} className={drawerStyles.appBar}>
                        <ChevronLeftIcon/>
                    </div>
                    : null}

                {children}
            </div>
        </div>
    )
}

export default Drawer;