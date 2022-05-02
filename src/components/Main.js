import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import React from 'react'

import Menu from "./Menu";
import CartProduct from "./CartProduct";
import IsMobile from '../isMobile'

import '../styles/body-fix.css'
import * as mainStyles from "../styles/main.module.css"

const menuWidth = 330;

const Main = ({info, cartProducts, children}) => {
    const shouldNotExpand = IsMobile();
    const [isDrawerOpened, setDrawerOpened] = React.useState(shouldNotExpand)

    return (<>
        <AppBar position="static" className={mainStyles.appBar}>
            <Toolbar>
                {
                    (shouldNotExpand) ?
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"

                            sx={{mr: 2}}
                            onClick={() => setDrawerOpened(true)}>
                            <MenuIcon/>
                        </IconButton> : null
                }
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Shop
                </Typography>
            </Toolbar>
        </AppBar>

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
                cartProducts.map(value => {
                    return <CartProduct product={value}/>
                })
            }
        </Menu>

        <div className={mainStyles.products}>
            {children}
        </div>

    </>)
}

export default Main;
