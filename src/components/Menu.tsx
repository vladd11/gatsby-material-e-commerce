import ListItemLink from "./ui/ListItemLink"
import ListItemIcon from "./ui/ListItemIcon"
import ListItemText from "./ui/ListItemText"

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import React, {ReactNode} from "react";
import {css} from "@emotion/react";

import Drawer from "./Drawer";

import {SiteInfo} from "../interfaces/data";
import User from "../interfaces/User";

const Menu = (props: MenuProps) => {
    return (<Drawer
        isDrawerOpened={props.isDrawerOpened}
        onClose={props.onClose}
        shouldNotExpand={props.shouldNotExpand}>
        <div css={css`
          height: 100%;

          display: flex;
          flex-direction: column;
        `}>
            {props.children}
        </div>

        <ListItemLink to={"order"}
                      state={props.orderLinkState}
                      disabled={props.isCartEmpty}
                      selected={!props.isCartEmpty}>
            <ListItemIcon>
                <LocalShippingIcon/>
            </ListItemIcon>
            <ListItemText>
                Оформить заказ
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={(props.user.phone) ? "/" : "/login"} state={{logout: props.user.phone != null}}>
            <ListItemIcon>
                <AccountCircleOutlinedIcon/>
            </ListItemIcon>
            <ListItemText secondary={props.user.phone}>
                {(props.user.phone) ? "Выйти" : "Войти"}
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={`tel:${props.info.phone}`} isExternalLink={true}>
            <ListItemIcon>
                <PhoneOutlinedIcon/>
            </ListItemIcon>
            <ListItemText secondary={`+${props.info.phone}`}>
                Позвоните нам
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={props.info.addressLink} isExternalLink={true}>
            <ListItemIcon>
                <PlaceOutlinedIcon/>
            </ListItemIcon>
            <ListItemText secondary={props.info.address}>
                Наш адрес
            </ListItemText>
        </ListItemLink>

        <ListItemLink to={"/about"}>
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
    shouldNotExpand: boolean,

    onClose: () => void,

    orderLinkState?: any,

    isCartEmpty: boolean,

    user: User,

    children: ReactNode
}

export default Menu;