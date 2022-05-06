import ListItemLink from "../ui/ListItemLink"
import ListItemIcon from "../ui/ListItemIcon"
import ListItemText from "../ui/ListItemText"

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import React from "react";

import Drawer from "./Drawer";

import * as menuStyles from '../styles/ui/menu-styles.module.sass'

import SiteInfo from "../interfaces/SiteInfo";

const Menu = (props: MenuProps) => {
    return (<Drawer
        isDrawerOpened={props.isDrawerOpened}
        onClose={props.onClose}
        shouldNotExpand={props.shouldNotExpand}>
        <div className={menuStyles.menuList}>
            {props.children}
        </div>

        <ListItemLink to={"order"} disabled={props.isCartEmpty} selected={!props.isCartEmpty}>
            <ListItemIcon>
                <LocalShippingIcon/>
            </ListItemIcon>
            <ListItemText>
                Оформить заказ
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={"login"}>
            <ListItemIcon>
                <AccountCircleOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>
                Войти
            </ListItemText>
        </ListItemLink>

        <ListItemLink component="a" to={`tel:${props.info.phone}`} isExternalLink={true}>
            <ListItemIcon>
                <PhoneOutlinedIcon/>
            </ListItemIcon>
            <ListItemText secondary={`+${props.info.phone}`}>
                Позвоните нам
            </ListItemText>
        </ListItemLink>

        <ListItemLink component="a" to={props.info.addressLink} isExternalLink={true}>
            <ListItemIcon>
                <PlaceOutlinedIcon/>
            </ListItemIcon>
            <ListItemText secondary={props.info.address}>
                Наш адрес
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={"about"}>
            <ListItemIcon>
                <InfoOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>
                О нас
            </ListItemText>
        </ListItemLink>
    </Drawer>)
}

interface MenuProps {
    info: SiteInfo,

    isDrawerOpened: boolean,
    onOpen,
    onClose,

    isCartEmpty: boolean,

    shouldNotExpand: boolean,
    children,
    sx
}

export default Menu;