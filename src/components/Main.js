import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";

import React from 'react'

import Menu from "./Menu";
import CartMenuProduct from "./CartMenuProduct";
import IsMobile from '../isMobile'

import '../styles/body-fix.sass'
import * as mainStyles from "../styles/main.module.sass"
import {Router} from "@reach/router";
import {navigate} from "gatsby";

const menuWidth = 330;

const Main = ({info, cartProducts, onDelete, children, menuOpen}) => {
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
                            onClick={() => {
                                navigate('/menu')
                            }}>
                            <Badge badgeContent={cartProducts.length} color="error">
                                <MenuIcon color="action"/>
                            </Badge>
                        </IconButton> : null
                }
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Shop
                </Typography>
            </Toolbar>
        </AppBar>

        <Router basepath="/">
            <Menu
                path="/menu"
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
        </Router>

        <div className={mainStyles.content}>
            {children}
        </div>

    </>)
}

export default Main;
