import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from "@mui/icons-material/Phone";

import React from "react"
import Helmet from "react-helmet";

import paymentMethods, {PaymentMethod} from "../../../paymentMethods"

import Main from "../Main";
import useStickyState from "../../states/localStorageState";
import CartProduct from "../cart/CartProduct";
import {toHumanReadable} from "../../currentDateTime";

import {BoldData, Products} from "./OrderStyles";

import {ImageFile, SiteInfo} from "../../interfaces/data";
import OrderResponse from "../../interfaces/order";

interface OrderCompleteProps {
    order?: OrderResponse;
    info: SiteInfo;
    allFile: {
        edges: Array<ImageFile>
    },
    enableNotifications: () => Promise<boolean>
}

export default function OrderCompleteComponent(props: OrderCompleteProps) {
    const [notificationsEnabled, setNotificationsEnabled] = useStickyState<boolean>(false, 'notificationsEnabled')

    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')
    const paymentMethod: PaymentMethod | undefined = (props.order) ? paymentMethods[props.order.paymentMethod] : undefined

    function renderProducts() {
        if (props.order) {
            return props.order?.products?.map(cartProduct => {
                if (!cartProduct.Image) {
                    cartProduct.Image = props.allFile.edges.find(value => value.node.relativePath === cartProduct.ImageURI)!
                        .node.childImageSharp.gatsbyImageData
                }

                return <CartProduct product={cartProduct}/>
            });
        } else return <div/>
    }

    async function notificationsEnabledChange() {
        if (!notificationsEnabled) {
            props.enableNotifications().then(setNotificationsEnabled)
        } else {
            setNotificationsEnabled(false)
        }
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
                <Products>
                    {renderProducts()}
                </Products>

                <ListItem>
                    <ListItemIcon>
                        <AccessTimeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Привезём {(props.order) ? toHumanReadable(props.order.time) : "..."}
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        {paymentMethod?.icon}
                    </ListItemIcon>
                    <ListItemText>
                        <span>{paymentMethod?.fullSentence}, итого:</span>
                        <BoldData>
                            {props.order?.price} рублей
                        </BoldData>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <PhoneIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <span>Телефон для связи:</span>
                        <BoldData>{props.order?.phone}</BoldData>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <Checkbox
                            sx={{padding: 0}}
                            checked={notificationsEnabled}
                            onClick={notificationsEnabledChange}
                            inputProps={{
                                'aria-label': 'Отправлять уведомления о заказе',
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText>
                        Отправлять уведомления о заказе
                    </ListItemText>
                </ListItem>
            </List>
        </Main>
    </>
}