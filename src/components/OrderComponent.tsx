import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import SpeedDialButton from "./ui/SpeedDialButton";

import SpeedDial from "./ui/SpeedDial";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";

import React, {useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";
import useStickyState from "../stickyState";

import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/components/order.module.sass"
import 'mapbox-gl/dist/mapbox-gl.css';

// @ts-ignore
import mapboxgl from '!mapbox-gl';

import Api from "../api/api";
import Product from "../interfaces/Product";

mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;

interface OrderComponentProps {
    api: Api,
    cartProducts: Array<Product>
}

const OrderComponent = (props: OrderComponentProps) => {
    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('+7', 'phone')

    const [isPhoneValid, setPhoneValid] = useState(true)
    const [isAddressValid, setAddressValid] = useState(true)

    const [isDialSelected, setDialSelected] = useState(false)

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(50.197174);
    const [lat] = useState(53.223690);
    const [zoom] = useState(10);

    useEffect(() => {
        if (map.current || isAddressFormManual) {
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/vladd11/cl2fzdsk000cy17pr0hg5w8bz?optimize=true',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }, trackUserLocation: true, showUserHeading: true
        }));
    }, [isAddressFormManual]);

    async function validateAndOrder(paymentMethod) {
        if (isEmptyOrSpaces(phone)) {
            setPhoneValid(false);
        }

        if (isEmptyOrSpaces(address) && isAddressFormManual) {
            setAddressValid(false);
        }

        if (isPhoneValid && isAddressValid) {
            try {
                const result = await props.api.order(props.cartProducts, phone, address, paymentMethod)
                if (result) {
                    window.location.replace(result);
                } else {

                }
            } catch (e) {
                if (e.code === 1005) {
                    await navigate("/confirm/", {
                        state: {
                            cartProducts: props.cartProducts,
                            address: address,
                            paymentMethod: paymentMethod,
                            phone: phone
                        }
                    })
                }
            }
        }
    }

    return <div className={orderStyles.order}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Оформление заказа
                </Typography>
            </Toolbar>
        </AppBar>

        <List sx={{
            display: "flex",
            flexDirection: "row",

            maxHeight: 200,
            overflow: 'auto'
        }}>
            {(props.cartProducts) ? props.cartProducts.map(cartProduct => {
                return <CartProduct product={cartProduct}>

                </CartProduct>
            }) : null}
        </List>

        <Typography sx={{marginLeft: "12px"}}>
            Итого:
            <Typography component="span" sx={{paddingLeft: "4px", fontWeight: "bold"}}>
                {(props.cartProducts) ? props.cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) : null} рублей
            </Typography>
        </Typography>

        <Divider sx={{
            borderBottomWidth: "medium",
            marginTop: '4px'
        }}/>

        <FormControl
            sx={{
                mt: '16px',
                width: "100%"
            }}
            required={true}
            error={!isPhoneValid}>

            <InputLabel htmlFor="phone">Номер телефона</InputLabel>
            <Input inputMode="tel" id="phone" aria-describedby="tel" sx={{pl: 1}} value={phone} onChange={event => {
                setPhone(event.target.value)
            }}/>
        </FormControl>

        <div className={orderStyles.addressInput}>
            <Button sx={{width: "100%", textTransform: "initial"}} onClick={() => {
                setAddressFormType(!isAddressFormManual)
            }}>
                {(isAddressFormManual) ? "Указать позицию на карте" : "Указать адрес вручную"}
            </Button>

            {(isAddressFormManual)
                ? <FormControl sx={{mt: '8px', mb: '64px', width: "100%"}}
                               required={true}
                               error={!isAddressValid}>
                    <InputLabel htmlFor="address">Адрес доставки</InputLabel>
                    <Input id="address"
                           aria-describedby="address"
                           sx={{pl: 1}}
                           value={address}
                           onChange={event => {
                               setAddress(event.target.value)
                           }}/>
                </FormControl>
                : null}

            <div className={orderStyles.container}
                 style={(isAddressFormManual) ? {display: 'none'} : null}>

                <div ref={mapContainer} className={orderStyles.mapContainer}/>
                <PlaceOutlinedIcon sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    paddingBottom: "48px",

                    fontSize: "48px"
                }}/>
            </div>
        </div>

        <SpeedDial className={orderStyles.speedDial} main={
            <Fab variant="extended" onClick={() => setDialSelected(!isDialSelected)} color="primary">
                <LocalShippingIcon sx={{
                    pr: 1
                }}/>
                <span className={orderStyles.text}>
                    Заказать
                </span>
            </Fab>
        } shown={isDialSelected} ariaLabel="Заказать">
            <SpeedDialButton tooltipText="Предоплата картой" onClick={() => validateAndOrder("card")}>
                <CreditCardIcon/>
            </SpeedDialButton>

            <SpeedDialButton tooltipText="Наличными при получении" onClick={() => validateAndOrder("cash")}>
                <MoneyIcon/>
            </SpeedDialButton>
        </SpeedDial>
    </div>
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

export default OrderComponent;