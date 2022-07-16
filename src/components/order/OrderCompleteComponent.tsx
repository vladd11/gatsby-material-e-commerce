import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from "@mui/icons-material/Phone";

import React, {useEffect, useState} from "react"
import Helmet from "react-helmet";

import paymentMethods, {PaymentMethod} from "../../../paymentMethods"

import Main from "../Main";
import useStickyState, {ifClientSide} from "../../states/localStorageState";
import CartProduct from "../cart/CartProduct";
import {toHumanReadable} from "../../currentDateTime";

import {BoldData, Products} from "./orderStyles";

import {ImageFile, SiteInfo} from "../../interfaces/data";
import OrderResponse from "../../interfaces/order";

import Api from "../../api/api";
import {getFCMToken} from "../../notifications/getFCMToken";

interface OrderCompleteProps {
    order?: OrderResponse;
    info: SiteInfo;
    allFile: {
        edges: Array<ImageFile>
    },
    api: Api
}

export default function OrderCompleteComponent(props: OrderCompleteProps) {
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(ifClientSide(() => Notification.permission === "granted") ?? false)

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

    async function notificationsEnabledChange(): Promise<void> {
        if (!notificationsEnabled) {
            setNotificationsEnabled(await enableNotifications())
        } else {
            setNotificationsEnabled(false)
            await disableNotifications()
        }
    }

    async function disableNotifications() {
        await props.api.disableNotifications()
    }

    useEffect(() => {
        if (Notification?.permission === "granted") {
            getFCMToken().then(result => props.api.getNotificationsStatus(result).then(setNotificationsEnabled))
        }
    }, [])

    async function enableNotifications(): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (Notification?.permission !== "granted") {
                Notification?.requestPermission().then(async (result) => {
                    if (result == "granted") {
                        props.api.enableNotifications(await getFCMToken()).catch(console.error)
                    }
                    resolve(result == "granted")
                });
            } else {
                resolve(true);
                props.api.enableNotifications(await getFCMToken()).catch(console.error);
            }
        })
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