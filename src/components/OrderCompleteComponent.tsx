import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from "@mui/icons-material/CreditCard";

import React from "react"

import Helmet from "react-helmet";
import {css} from "@emotion/react";
import Main from "../components/Main";
import {ImageFile, SiteInfo} from "../interfaces/data";
import useStickyState from "../stickyState";
import CartProduct from "./CartProduct";
import Order from "../interfaces/order";
import {toHumanReadable} from "../currentDateTime";

interface OrderCompleteProps {
    order: Order;
    info: SiteInfo;
    allFile: {
        edges: Array<ImageFile>
    }
}

export default function OrderCompleteComponent(props: OrderCompleteProps) {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')

    function renderProducts() {
        if (props.order) {
            return props.order.products.map(cartProduct => {
                if (!cartProduct.Image) {
                    cartProduct.Image = props.allFile.edges.find(value => value.node.relativePath === cartProduct.ImageURI)
                        .node.childImageSharp.gatsbyImageData
                }

                return <CartProduct product={cartProduct}/>
            });
        } else return <div/>
    }

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.info.title} | Заказ оформлен</title>
            <meta name="description" content={props.info.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/order-complete"/>
        </Helmet>
        <Main info={props.info}
              cartProducts={cartProducts} setCartProducts={setCartProducts}>
            <List>
                <div css={css`
                  display: flex;
                  flex-direction: row;

                  max-height: 200px;
                  overflow: auto;
                `}>
                    {renderProducts()}
                </div>

                <ListItem>
                    <ListItemIcon>
                        <AccessTimeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Привезём {(props.order) ? toHumanReadable(new Date(props.order.time * 1000)) : "..."}
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
                            {props.order?.price} рублей
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Main>
    </>
}