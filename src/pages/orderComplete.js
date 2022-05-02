import ThemeProvider from "@mui/material/styles/ThemeProvider"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from "@mui/icons-material/CreditCard";

import React from "react"

import theme from "../theme";
import Helmet from "react-helmet";
import {graphql, useStaticQuery} from "gatsby";

const OrderComplete = () => {
    const data = useStaticQuery(graphql`
{
  site {
    siteMetadata {
      title
      description
    }
  }
}`)
    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Заказ оформлен</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/confirm"/>
        </Helmet>
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="span">
                        Заказ оформлен
                    </Typography>
                </Toolbar>
            </AppBar>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <AccessTimeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Привезём сегодня в 18:00
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CreditCardIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography component="span">
                            Вы оплатили заказ картой, итого:
                        </Typography>
                        <Typography component="span" sx={{
                            fontWeight: "bold",
                            pl: '4px'
                        }}>
                            100 рублей
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </ThemeProvider>
    </>
}

export default OrderComplete;
