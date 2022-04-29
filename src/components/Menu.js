import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import Link from "./Link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import Drawer from "./Drawer";

const Menu = ({info, isDrawerOpened, onOpen, onClose, sx, shouldNotExpand, children}) => {
    return (<Drawer
        sx={sx}
        isDrawerOpened={isDrawerOpened}
        onOpen={onOpen}
        onClose={onClose}
        shouldNotExpand={shouldNotExpand}
        anchor="left">
                <List style={{height: '100%'}}>
                    {children}
                </List>

                <div style={{display: "flex", flexDirection: "column"}}>
                    <ListItemButton component={Link} key={"login"} to={"login"}>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Войти'}/>
                    </ListItemButton>

                    <ListItemButton component={"a"} key={"phone"} to={`tel:${info.phone}`}>
                        <ListItemIcon>
                            <PhoneOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Позвоните нам'} secondary={`+${info.phone}`}/>
                    </ListItemButton>

                    <ListItemButton component={"a"} key={"place"}
                                    to={info.addressLink}>
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