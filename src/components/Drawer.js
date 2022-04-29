import React from "react";
import {Divider, List, ListItemButton, SwipeableDrawer} from "@mui/material";
import * as drawerStyles from "../styles/drawer.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


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