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

const menuWidth = 330;

const Main = ({info, cartProducts, onDelete, children, menuOpen}) => {
    const shouldNotExpand = IsMobile();
    const [isDrawerOpened, setDrawerOpened] = React.useState(shouldNotExpand)

    return (<>
        <Appbar title={info.title}>
            {(shouldNotExpand) ?
                <IconButton
                    onClick={() => {
                        setDrawerOpened(true)
                    }}>
                    <Badge marker="1">
                        <MenuIcon color="action"/>
                    </Badge>
                </IconButton> : null}
        </Appbar>

        <Menu
            info={info}

            isDrawerOpened={isDrawerOpened}
            onOpen={() => {
            }}
            onClose={() => {
                setDrawerOpened(false)
            }}
            isCartEmpty={cartProducts.length === 0}

            sx={{width: menuWidth}}
            shouldNotExpand={shouldNotExpand}>

            {
                cartProducts.map((cartProduct, index) => {
                    return <CartMenuProduct product={cartProduct}
                                            onDelete={() => {
                                                onDelete(index)
                                            }}/>
                })
            }
        </Menu>

        <div className={mainStyles.content}>
            {children}
        </div>

    </>)
}

export default Main;
