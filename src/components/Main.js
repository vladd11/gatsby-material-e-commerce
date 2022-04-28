import Drawer from "./Drawer";
import React from 'react'
import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import '../styles/body-fix.css'

const Main = () => {
    const [isDrawerOpened, setDrawerOpened] = React.useState(false)

    return (<>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"

                        sx={{mr: 2}}
                        onClick={() => setDrawerOpened(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Shop
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer isDrawerOpened={isDrawerOpened} onOpen={() => {
                setDrawerOpened(true)
            }} onClose={() => {
                setDrawerOpened(false)
            }}/>
        </>
    )
}

export default Main;
