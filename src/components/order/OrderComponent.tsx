import React, {useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";

import Fab from "@mui/material/Fab";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SpeedDialButton from "../ui/SpeedDialButton";
import SpeedDial from "../ui/SpeedDial";
import FormFrame from "../frames/FormFrame";
import {BoldData, DatetimeForm, Products, TotalField} from "./orderStyles";
import CartProduct from "../cart/CartProduct";
import AddressField from "../fields/AddressField";
import PhoneField from "../fields/PhoneField";
import DateField from "../fields/DateField";
import TimeField from "../fields/TimeField";

import useStickyState from "../../states/localStorageState";

import getCurrentDateTime, {parseDateTime} from "../../currentDateTime"

import * as orderStyles from "../../styles/components/order.module.sass"
import paymentMethods from "../../../paymentMethods"

import Api from "../../api/api";
import redirect from "../../redirect";
import convertPhoneToE164 from "../../convertPhoneToE164";

import Product from "../../types/product";

import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import mapboxgl from '!mapbox-gl';
import {css} from "@emotion/react";
import ExpandedButtonLabel from "../ui/ExpandedButtonLabel";
import {navigate} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";

mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;

interface OrderComponentProps {
    api: Api,
    cartProducts: Array<Product>,
    getImage: (imageUri: string) => IGatsbyImageData,
    siteMetadata: { title: string, description: string }
}

const OrderComponent = (props: OrderComponentProps) => {
    const [isPhoneValid, setPhoneValid] = useState(true)
    const [isAddressValid, setAddressValid] = useState(true)
    const [isDateValid, setDateValid] = useState(true)

    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('', 'phone')
    const [time, setTime] = useStickyState<number[]>([0, 100], 'time')
    const [date, setDate] = useStickyState<string>(getCurrentDateTime(), 'date')

    const [lock, setLock] = useState(false)
    const [isDialSelected, setDialSelected] = useState(false)

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

        let valid = true;
        const notValid = (setState: (value: boolean) => void) => {
            setState(false);
            valid = false;
        }

        let clearAddress = address
        if (isAddressFormManual) {
            if (isEmptyOrSpaces(address)) {
                notValid(setAddressValid)
            }
        } else {
            const center = map.current.getCenter()
            clearAddress = `${center.lat} ${center.lng}`
        }

        let clearPhone = convertPhoneToE164(phone, "+7");
        if (!clearPhone) notValid(setPhoneValid);

        if (!date) notValid(setDateValid)

        if (valid) {
            try {
                const times = parseDateTime(date, time)
                await redirect(
                    await props.api.order(props.cartProducts,
                        clearPhone!,
                        clearAddress,
                        paymentMethod,
                        times),
                    clearPhone!,
                    clearAddress,
                    times,
                    paymentMethod
                )
            } catch (e: any) {
                if (e.code === 401) {
                    await navigate("/order/confirm/", {
                        state: {
                            cartProducts: props.cartProducts,
                            address: clearAddress,
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
        <Helmet htmlAttributes={{lang: 'ru'}}>
            <title>{props.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={props.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <FormFrame title="Оформление заказа">
            <Products>
                {(props.cartProducts) ? props.cartProducts.map(cartProduct => {
                    return <CartProduct getImage={props.getImage} product={cartProduct}/>
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
                <TimeField value={time} onChange={setTime}/>
            </DatetimeForm>

            <AddressField value={address} onChange={setAddress}
                          valid={isAddressValid} lock={lock}
                          isManual={isAddressFormManual} onTypeChange={setAddressFormType}>
                <div ref={mapContainer} className={orderStyles.mapContainer}/>
            </AddressField>

            <SpeedDial css={css`
              position: absolute;
              right: 0;
              bottom: 0;
            `} main={
                <Fab variant="extended" onClick={() => setDialSelected(!isDialSelected)} color="primary">
                    <LocalShippingIcon/>
                    <ExpandedButtonLabel>
                        Заказать
                    </ExpandedButtonLabel>
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