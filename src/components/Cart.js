import React from "react";
import {ListItemButton, ListItemText} from "@mui/material";
import Drawer from "./Drawer";

const Cart = ({isCartOpened, onOpen, onClose, shouldNotExpand}) => {
    return <Drawer
        key="cart"
        isDrawerOpened={isCartOpened}
        onOpen={onOpen}
        onClose={onClose}
        shouldNotExpand={shouldNotExpand}
        anchor="right">
        <ListItemButton>
            <ListItemText primary="Test" />
        </ListItemButton>
    </Drawer>
}

export default Cart;