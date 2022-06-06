import React, {useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";

import {Helmet} from "react-helmet";
import Fab from "@mui/material/Fab";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import SpeedDialButton from "../ui/SpeedDialButton";
import SpeedDial from "../ui/SpeedDial";

import useStickyState from "../../states/localStorageState";

import getCurrentDateTime, {parseDateTime, addTime} from "../../currentDateTime"

import CartProduct from "../cart/CartProduct";
import * as orderStyles from "../../styles/components/order.module.sass"

import paymentMethods from "../../../paymentMethods"
import Api, {JSONRPCError} from "../../api/api";

import redirect from "../../redirect";
import convertPhoneToE164 from "../../convertPhoneToE164";

import FormFrame from "../frames/FormFrame";

import {Products, BoldData, TotalField, DatetimeForm} from "./OrderStyles";
import AddressField from "./fields/AddressField";
import PhoneField from "./fields/PhoneField";
import DateField from "./fields/DateField";
import TimeField from "./fields/TimeField";
import {FromTime, ToTime} from "./fields/TimeComponents";

import {SiteInfo} from "../../interfaces/data";
import Product from "../../interfaces/product";

import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;

interface OrderComponentProps {
    api: Api,
    cartProducts: Array<Product>,
    siteMetadata: SiteInfo
}

const OrderComponent = (props: OrderComponentProps) => {
    const {defaultTime, defaultDate} = getCurrentDateTime();

    const [isPhoneValid, setPhoneValid] = useState(true)
    const [isAddressValid, setAddressValid] = useState(true)
    const [isTimeValid, setTimeValid] = useState(true)
    const [isDateValid, setDateValid] = useState(true)

    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('', 'phone')
    const [time, setTime] = useStickyState(defaultTime, 'time')
    const [date, setDate] = useStickyState(defaultDate, 'date')

    const [lock, setLock] = useState(false)
    const [isDialSelected, setDialSelected] = useState(false)

    const maxTime = addTime(parseDateTime(date, time), 3600 * 2);
    const maxTimeMinutes = (maxTime.getMinutes() || 0).toString().padStart(2, "0")
    const maxTimeHours = (maxTime.getHours() || 0).toString().padStart(2, "0")

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map>(null);
    const [lng] = useState(50.197174);
    const [lat] = useState(53.223690);
    const [zoom] = useState(10);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/vladd11/cl2fzdsk000cy17pr0hg5w8bz?optimize=true',
            center: [lng, lat],
            zoom: zoom
        });
        map.current!.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }, trackUserLocation: true, showUserHeading: true
        }));
    }, []);

    useEffect(() => {
        if (!isPhoneValid) setPhoneValid(true);
    }, [phone])

    async function validateAndOrder(paymentMethod: string) {
        setLock(true);

        if (isEmptyOrSpaces(address) && isAddressFormManual) {
            setAddressValid(false);
        }

        let clearPhone = convertPhoneToE164(phone, "+7");
        if (!clearPhone) setPhoneValid(false);

        if (!date) setDateValid(false)
        if (!time) setTimeValid(false)

        if (isAddressValid && clearPhone && time && date) {
            try {
                await redirect(
                    await props.api.order(props.cartProducts,
                        clearPhone,
                        address,
                        paymentMethod,
                        parseDateTime(date, time))
                )
            } catch (e: any) {
                if (e instanceof JSONRPCError && e.code === 1005) {
                    await navigate("/confirm/", {
                        state: {
                            cartProducts: props.cartProducts,
                            address: address,
                            paymentMethod: paymentMethod,
                            phone: clearPhone,
                            time: parseDateTime(date, time)
                        }
                    })
                }
            }
        }

        setLock(false)
    }

    function renderButtons() {
        return Object.keys(paymentMethods).map((index) => {
            const method = paymentMethods[index];
            return <SpeedDialButton disabled={lock}
                                    tooltipText={method.buttonName}
                                    onClick={() => validateAndOrder(index)}>
                {method.icon}
            </SpeedDialButton>
        });
    }

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={props.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <FormFrame title="Оформление заказа">
            <Products>
                {(props.cartProducts) ? props.cartProducts.map(cartProduct => {
                    return <CartProduct product={cartProduct}/>
                }) : null}
            </Products>

            <TotalField>
                Итого:
                <BoldData>
                    {(props.cartProducts)
                        ? props.cartProducts.reduce((n, cartProduct) => n + cartProduct.Price, 0)
                        : null} рублей
                </BoldData>
            </TotalField>

            <PhoneField value={phone} onChange={setPhone} valid={isPhoneValid} lock={lock}/>

            <DatetimeForm>
                <DateField value={date} onChange={setDate} lock={lock} valid={isDateValid}/>
                <FromTime/>
                <TimeField value={time} onChange={setTime} lock={lock} valid={isTimeValid}/>
                <ToTime>
                    {maxTimeHours}:{maxTimeMinutes}
                </ToTime>
            </DatetimeForm>

            <AddressField value={address} onChange={setAddress}
                          valid={isAddressValid} lock={lock}
                          isManual={isAddressFormManual} onTypeChange={setAddressFormType}>
                <div ref={mapContainer} className={orderStyles.mapContainer}/>
            </AddressField>

            <SpeedDial className={orderStyles.speedDial} main={
                <Fab variant="extended" onClick={() => setDialSelected(!isDialSelected)} color="primary">
                    <LocalShippingIcon sx={{pr: 1}}/>
                    <span className={orderStyles.text}>
                    Заказать
                </span>
                </Fab>
            } shown={isDialSelected} ariaLabel="Заказать">
                {renderButtons()}
            </SpeedDial>
        </FormFrame>
    </>
}

function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null;
}

export default OrderComponent;