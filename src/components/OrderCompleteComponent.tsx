import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from "@mui/icons-material/CreditCard";

import React from "react"

import theme from "../theme";
import Helmet from "react-helmet";
import {css, Global} from "@emotion/react";
import Main from "../components/Main";
import Data from "../interfaces/data";
import useStickyState from "../stickyState";

interface OrderCompleteProps {
    data: Data
}

export default function OrderCompleteComponent(props: OrderCompleteProps) {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')

    return <>
        <Global styles={css`
          body {
            font-family: ${theme.typography.fontFamily};
          }
        `}/>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.data.site.siteMetadata.title} | Заказ оформлен</title>
            <meta name="description" content={props.data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/order-complete"/>
        </Helmet>
        <Main info={props.data.site.siteMetadata}
              cartProducts={cartProducts} setCartProducts={setCartProducts}>
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
        </Main>
    </>
}