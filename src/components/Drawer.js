import React from "react";

import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as drawerStyles from "../styles/drawer.module.sass";


const Drawer = ({children, anchor, isDrawerOpened, onOpen, onClose, sx, shouldNotExpand}) => {
    return (
        <SwipeableDrawer
            disableBackdropTransition={true}
            disableDiscovery={true}

            anchor={anchor}
            variant={shouldNotExpand ? 'persistent' : 'permanent'}
            open={isDrawerOpened}
            onClose={onClose}
            onOpen={onOpen}

            sx={sx}>
            <List disablePadding={true} className={drawerStyles.appBarList}>
                {(shouldNotExpand) ?
                    <ListItemButton key={"heading_drawer"} onClick={onClose} className={drawerStyles.appBar}
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'end'
                                    }}>
                        <ChevronLeftIcon/>
                    </ListItemButton>
                    : null}

                <Divider/>

                {children}
            </List>
        </SwipeableDrawer>
    )
}

export default Drawer;