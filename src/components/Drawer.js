import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import Link from "./Link";
import info from "../info";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, {useEffect, useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from "@mui/material/Typography";

import * as drawerStyles from '../styles/drawer.module.css'

const Drawer = ({isDrawerOpened, onOpen, onClose}) => {
    const [width, setWidth] = useState(1024);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const shouldNotExpand = (width <= 1024);

    return (<React.Fragment key="drawer">
        <SwipeableDrawer
            disableBackdropTransition={true}
            disableDiscovery={true}

            anchor="left"
            variant={shouldNotExpand ? 'persistent' : 'permanent'}
            open={isDrawerOpened}
            onClose={onClose}
            onOpen={onOpen}
        >
            <List disablePadding={true}>
                <ListItemButton key={"title"} onClick={onClose} className={drawerStyles.appBar}
                                style={{
                                    textAlign: 'center',
                                    justifyContent: shouldNotExpand ? 'end' : 'center'
                                }}>
                    {shouldNotExpand ? <ChevronLeftIcon/> : <Typography fontSize={28}>{info.site.name}</Typography>}
                </ListItemButton>

                <Divider/>

                <ListItemButton component={Link} key={"login"} to={"login"}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Войти'}/>
                </ListItemButton>

                <ListItemButton component={Link} key={"phone"} to={`tel:${info.admin.phone}`}>
                    <ListItemIcon>
                        <PhoneOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Позвоните нам'} secondary={`+${info.admin.phone}`}/>
                </ListItemButton>

                <ListItemButton component={Link} key={"place"}
                                to={info.admin.addressLink}>
                    <ListItemIcon>
                        <PlaceOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Наш адрес'} secondary={info.admin.address}/>
                </ListItemButton>

                <ListItemButton component={Link} key={"about"} to={"about"}>
                    <ListItemIcon>
                        <InfoOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'О нас'}/>
                </ListItemButton>
            </List>
        </SwipeableDrawer>
    </React.Fragment>)
}

export default Drawer;