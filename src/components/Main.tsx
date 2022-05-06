import React from 'react'

import Menu from "./Menu";
import CartMenuProduct from "./CartMenuProduct";
import IsMobile from '../isMobile'

import '../styles/body-fix.sass'
import * as mainStyles from "../styles/components/main.module.sass"

import IconButton from "../ui/IconButton";
import Appbar from "../ui/Appbar";
import Badge from "../ui/Badge";

import MenuIcon from "@mui/icons-material/Menu";
import CartProduct from "../api/cartProduct";
import SiteInfo from "../interfaces/SiteInfo";

const menuWidth = 330;

interface MainProps {
    info: SiteInfo,
    cartProducts: Array<CartProduct>,
    onDelete: (index: number) => void,
    children
}

const Main = (props: MainProps) => {
    const shouldNotExpand = IsMobile();
    const [isDrawerOpened, setDrawerOpened] = React.useState(shouldNotExpand)

    return (<>
        <Appbar title={props.info.title}>
            {(shouldNotExpand) ?
                <IconButton
                    onClick={() => {
                        setDrawerOpened(true)
                    }}>
                    <Badge marker={(props.cartProducts.length === 0) ? null : props.cartProducts.length}>
                        <MenuIcon/>
                    </Badge>
                </IconButton> : null}
        </Appbar>

        <Menu
            info={props.info}

            isDrawerOpened={isDrawerOpened}
            onOpen={() => {
            }}
            onClose={() => {
                setDrawerOpened(false)
            }}
            isCartEmpty={props.cartProducts.length === 0}

            sx={{width: menuWidth}}
            shouldNotExpand={shouldNotExpand}>

            {
                props.cartProducts.map((cartProduct, index) => {
                    return <CartMenuProduct product={cartProduct}
                                            onDelete={() => {
                                                props.onDelete(index)
                                            }}/>
                })
            }
        </Menu>

        <div className={mainStyles.content}>
            {props.children}
        </div>

    </>)
}

export default Main;
