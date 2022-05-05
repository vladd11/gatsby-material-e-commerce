import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import React from "react";

import Link from "./Link";
import Drawer from "./Drawer";

const Menu = ({
                  info,

                  isDrawerOpened,
                  onOpen,
                  onClose,

                  isCartEmpty,

                  shouldNotExpand,
                  children,
                  sx
              }) => {
    return (<Drawer
        sx={sx}
        isDrawerOpened={isDrawerOpened}
        onOpen={onOpen}
        onClose={onClose}
        shouldNotExpand={shouldNotExpand}
        anchor="left">
        <List sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </List>

        <div style={{display: "flex", flexDirection: "column"}}>
            <ListItemButton component={Link} key={"order"} to={"order"} disabled={isCartEmpty} selected={!isCartEmpty}>
                <ListItemIcon>
                    <LocalShippingIcon/>
                </ListItemIcon>
                <ListItemText primary={'Оформить заказ'}/>
            </ListItemButton>

            <ListItemButton component={Link} key={"login"} to={"login"}>
                <ListItemIcon>
                    <AccountCircleOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'Войти'}/>
            </ListItemButton>

            <ListItemButton component={"a"} key={"phone"} href={`tel:${info.phone}`}>
                <ListItemIcon>
                    <PhoneOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'Позвоните нам'} secondary={`+${info.phone}`}/>
            </ListItemButton>

            <ListItemButton component={"a"} key={"place"}
                            href={info.addressLink}>
                <ListItemIcon>
                    <PlaceOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'Наш адрес'} secondary={info.address}/>
            </ListItemButton>

            <ListItemButton component={Link} key={"about"} to={"about"}>
                <ListItemIcon>
                    <InfoOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'О нас'}/>
            </ListItemButton>
        </div>
    </Drawer>)
}

export default Menu;