import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/Money';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import React, {useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";
import useStickyState from "../stickyState";

import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/order.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;


const OrderComponent = ({api}) => {
    const [cartProducts] = useStickyState([], 'cartProducts')
    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('+7', 'phone')

    const [isPhoneValid, setPhoneValid] = useState(true)
    const [isAddressValid, setAddressValid] = useState(true)

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
        console.log(paymentMethod)

        if (isEmptyOrSpaces(phone)) {
            setPhoneValid(false);
        }

        if (isEmptyOrSpaces(address) && isAddressFormManual) {
            setAddressValid(false);
        }

        if (isPhoneValid && isAddressValid) {
            try {
                const result = await api.order(cartProducts, phone, address, paymentMethod)
                if (result) {
                    //window.location.replace(result);
                } else {

                }
            } catch (e) {
                if (e.code === 1005) {
                    localStorage.setItem("paymentMethod", paymentMethod)
                    navigate("/confirm/")
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

        <List style={{display: "flex", flexDirection: "row", maxHeight: 200, overflow: 'auto'}}>
            {cartProducts.map(cartProduct => {
                return <CartProduct product={cartProduct}/>
            })}
        </List>

        <Typography sx={{marginLeft: "12px"}}>
            Итого:
            <span style={{paddingLeft: "4px", fontWeight: "bold"}}>
                {cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) / 100} рублей
            </span>
        </Typography>

        <Divider style={{borderBottomWidth: "medium", marginTop: '4px'}}/>

        <FormControl sx={{mt: '16px'}} required={true} style={{width: "100%"}} error={!isPhoneValid}>
            <InputLabel htmlFor="phone">Номер телефона</InputLabel>
            <Input inputmode="tel" id="phone" aria-describedby="tel" sx={{pl: 1}} value={phone} onChange={event => {
                setPhone(event.target.value)
            }}/>
        </FormControl>

        <div>
            <Button variant="small" sx={{width: "100%", textTransform: "initial"}} onClick={() => {
                setAddressFormType(!isAddressFormManual)
            }}>
                {(isAddressFormManual) ? "Указать позицию на карте" : "Указать адрес вручную"}
            </Button>

            {(isAddressFormManual)
                ? <FormControl sx={{mt: '8px', mb: '64px'}}
                               required={true}
                               style={{width: "100%"}}
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
                 style={(isAddressFormManual) ? {display: 'none'} : {height: '300px'}}>

                <div ref={mapContainer} className="map-container" style={{height: '300px'}}/>
                <PlaceOutlinedIcon className={orderStyles.placeIcon}/>
            </div>
        </div>

        <SpeedDial
            color="primary"
            ariaLabel="Заказать"
            style={{textTransform: 'initial'}}
            className={orderStyles.fab}
            icon={<LocalShippingIcon/>}
        >
            <SpeedDialAction
                key="payCard"

                tooltipTitle="Оплата картой"

                onFocus={() => validateAndOrder("card")}

                icon={<CreditCardIcon/>}
            />
            <SpeedDialAction
                key="payCash"
                tooltipTitle="Оплата наличными"

                onFocus={() => validateAndOrder("cash")}

                icon={<MoneyIcon/>}
            />
        </SpeedDial>
    </div>
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

export default OrderComponent;
