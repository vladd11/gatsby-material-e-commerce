import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/Money';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

/*
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";*/
import React, {useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";
import useStickyState from "../stickyState";

import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/components/order.module.sass"

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import Input from "./ui/Input";
import Appbar from "./ui/Appbar";
import SpeedDial from "./ui/SpeedDial";
import ActionButton from "./ui/ActionButton";
import SpeedDialButton from "./ui/SpeedDialButton";

mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;


const OrderComponent = ({api}) => {
    const [cartProducts] = useStickyState([], 'cartProducts')
    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('+7', 'phone')

    const [isDialSelected, setDialSelected] = useState(false)
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

        mapboxgl.workerClass = MapboxWorker;

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
                const result = await api.order(cartProducts, phone, address, paymentMethod)
                if (result) {
                    //window.location.replace(result);
                } else {

                }
            } catch (e) {
                if (e.code === 1005) {
                    await navigate("/confirm/", {
                        state: {
                            cartProducts: cartProducts,
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
        <Appbar title="Оформление заказа"/>

        <div className={orderStyles.products}>
            {cartProducts.map(cartProduct => {
                return <CartProduct product={cartProduct}/>
            })}
        </div>

        <span className={orderStyles.priceLabel}>
            Итого:
            <span className={orderStyles.price}>
                {cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) / 100} рублей
            </span>
        </span>

        <hr className={orderStyles.divider}/>

        <Input className={orderStyles.phoneInput} id="phone" type="tel" onChange={(e) => {
            setPhone(e.target.value)
        }} value={phone}>
            Номер телефона
        </Input>

        <div className={orderStyles.addressInput} style={(isAddressFormManual) ? {height: '300px'} : null}>
            <button className={orderStyles.button} onClick={() => {
                setAddressFormType(!isAddressFormManual)
            }}>
                {(isAddressFormManual) ? "Указать позицию на карте" : "Указать адрес вручную"}
            </button>

            {(isAddressFormManual)
                ? <Input id="address" type="address" onChange={e => {
                    setAddress(e.target.value)
                }}>
                    Адрес доставки
                </Input>
                : null}

            <div className={orderStyles.container}
                 style={(isAddressFormManual) ? {display: 'none'} : null}>

                <div ref={mapContainer} className="map-container" style={{height: '100%'}}/>
                <PlaceOutlinedIcon className={orderStyles.placeIcon}/>
            </div>
        </div>

        <SpeedDial className={orderStyles.speedDial} main={
            <ActionButton className={orderStyles.orderButton}
                          onClick={() => setDialSelected(!isDialSelected)}>
                <LocalShippingIcon/>
                <span className={orderStyles.text}>
                    Заказать
                </span>
            </ActionButton>
        } shown={isDialSelected}>
            <SpeedDialButton tooltipText="Предоплата картой" onClick={() => validateAndOrder("card")}>
                <CreditCardIcon/>
            </SpeedDialButton>

            <SpeedDialButton tooltipText="Наличными при получении" onClick={() => validateAndOrder("cash")}>
                <MoneyIcon/>
            </SpeedDialButton>
        </SpeedDial>

        {/*<SpeedDial
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
        </SpeedDial>*/}
    </div>
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

export default OrderComponent;
