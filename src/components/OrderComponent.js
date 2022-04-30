import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, {useEffect, useRef, useState} from "react";
import useStickyState from "../stickyState";
import Typography from "@mui/material/Typography";
import {AppBar, Button, Divider, Fab, FormControl, Input, InputLabel, List, Toolbar} from "@mui/material";
import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/order.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZGQxMSIsImEiOiJjbDJjMmR2ejkwbDUxM2RwOWR5YXFyMXJrIn0.IHatcZkWxh4NihPcN2PYcA';


const OrderComponent = () => {
    const [cartProducts] = useStickyState([], 'cartProducts')
    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'manualAddressChoice')
    const [phone, setPhone] = useStickyState('+7', 'phone')

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(50.197174);
    const [lat] = useState(53.223690);
    const [zoom] = useState(10);

    useEffect(() => {
        if (map.current) {
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/vladd11/cl2fzdsk000cy17pr0hg5w8bz',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }, trackUserLocation: true, showUserHeading: true
        }));
    });

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

        <FormControl sx={{mt: '16px'}} required={true} style={{width: "100%"}}>
            <InputLabel htmlFor="phone">Номер телефона</InputLabel>
            <Input id="phone" aria-describedby="tel" sx={{pl: 1}} value={phone} onChange={event => {
                setPhone(event.target.value)
            }}/>
        </FormControl>

        <div>
            <Button variant="small" sx={{width: "100%", textTransform: "initial"}} onClick={() => {
                setAddressFormType(!isAddressFormManual)
            }}>
                {(isAddressFormManual) ? "Указать позицию на карте" : "Указать адрес вручную"}
            </Button>

            {(isAddressFormManual) ?
                <FormControl sx={{mt: '16px', mb: '64px'}} required={true} style={{width: "100%"}}>
                    <InputLabel htmlFor="address">Адрес доставки</InputLabel>
                    <Input id="address" aria-describedby="address" sx={{pl: 1}} value={address} onChange={event => {
                        setAddress(event.target.value)
                    }}/>
                </FormControl>
                : null}

            <div ref={mapContainer} className="map-container"
                 style={(isAddressFormManual) ? {display: 'none'} : {height: '300px'}}/>
        </div>

        <Fab color="primary" aria-label="Заказать" variant="extended" style={{textTransform: 'initial'}}
             className={orderStyles.fab}>

            <LocalShippingIcon sx={{mr: 1}}/>
            Заказать
        </Fab>
    </div>
}

export default OrderComponent;
