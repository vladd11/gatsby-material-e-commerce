import React from 'react'
import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import '../styles/body-fix.css'
import Menu from "./Menu";
import CartProduct from "./CartProduct";
import IsMobile from '../isMobile'

const menuWidth = 330;

const Main = ({info, cartProducts, children}) => {
    const shouldNotExpand = IsMobile();
    const [isDrawerOpened, setDrawerOpened] = React.useState(!shouldNotExpand)

    return (<>
        <AppBar position="static" sx={
            (shouldNotExpand) ?
                {} : {
                    width: {sm: `calc(100% - ${menuWidth}px)`},
                    ml: {sm: `${menuWidth - 5}px`}
                }
        }>
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
                    return <CartProduct product={value} />
                })
            }
        </Menu>

        <div style={(shouldNotExpand)
            ? {display: "flex", flexWrap: "wrap"}
            : {marginLeft: menuWidth, display: "flex", flexWrap: "wrap"}}>

            {children}
        </div>
    </>)
}

export default Main;
