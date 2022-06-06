import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import SpeedDialButton from "./ui/SpeedDialButton";
import SpeedDial from "./ui/SpeedDial";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import React, {useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";
import useStickyState from "../localStorageState";

import getCurrentDateTime, {parseDateTime, addTime} from "../currentDateTime"

import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/components/order.module.sass"
import paymentMethods from "../../paymentMethods"

import Api, {JSONRPCError} from "../api/api";
import Product from "../interfaces/product";
import redirect from "../redirect";
import {css} from "@emotion/react";

import convertPhoneToE164 from "../convertPhoneToE164";

import FormFrame from "./frames/FormFrame";

import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.GATSBY_MAP_KEY;

interface OrderComponentProps {
    api: Api,
    cartProducts: Array<Product>
}

const OrderComponent = (props: OrderComponentProps) => {
    const {defaultTime, defaultDate} = getCurrentDateTime();

    const [isAddressFormManual, setAddressFormType] = useStickyState(false, 'manualAddressChoice')
    const [address, setAddress] = useStickyState('', 'address')
    const [phone, setPhone] = useStickyState('', 'phone')
    const [time, setTime] = useStickyState(defaultTime, 'time')
    const [date, setDate] = useStickyState(defaultDate, 'date')

    const maxTime = addTime(parseDateTime(date, time), 3600 * 2);
    const maxTimeMinutes = maxTime.getMinutes().toString().padStart(2, "0")
    const maxTimeHours = maxTime.getHours().toString().padStart(2, "0")

    const [isPhoneValid, setPhoneValid] = useState(true)
    const [isAddressValid, setAddressValid] = useState(true)
    const [isTimeValid, setTimeValid] = useState(true)
    const [isDateValid, setDateValid] = useState(true)

    const [lock, setLock] = useState(false)
    const [isDialSelected, setDialSelected] = useState(false)

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map>(null);
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
        map.current!.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            }, trackUserLocation: true, showUserHeading: true
        }));
    }, [isAddressFormManual]);

    useEffect(() => {
        if (!isPhoneValid) setPhoneValid(true);
    }, [phone])

    async function validateAndOrder(paymentMethod: string) {
        setLock(true);

        let addressValid = true;
        if (isEmptyOrSpaces(address) && isAddressFormManual) {
            setAddressValid(false);
            addressValid = false;
        }

        let clearPhone = convertPhoneToE164(phone, "+7");
        if (!clearPhone) {
            setPhoneValid(false);
        }

        if (addressValid && clearPhone) {
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

    return <FormFrame title="Оформление заказа">
        <div css={css`
          display: flex;
          flex-direction: row;

          max-height: 200px;
          overflow: auto;
        `}>
            {(props.cartProducts) ? props.cartProducts.map(cartProduct => {
                return <CartProduct product={cartProduct}/>
            }) : null}
        </div>

        <Typography sx={{marginLeft: "12px", paddingBottom: "4px"}}>
            Итого:
            <Typography component="span" sx={{
                paddingLeft: "4px",
                fontWeight: "bold"
            }}>
                {(props.cartProducts) ? props.cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) : null} рублей
            </Typography>
        </Typography>

        <FormControl
            sx={{
                mt: '16px',
                width: "100%"
            }}
            required={true}
            error={!isPhoneValid}>
            <InputLabel htmlFor="phone">Номер телефона</InputLabel>
            <Input
                readOnly={lock}
                inputMode="tel"
                id="phone"
                aria-describedby="tel"
                sx={{pl: 1}}
                value={phone}
                onChange={event => setPhone(event.target.value)}
                startAdornment={<span css={css`padding-right: 8px`}>+7</span>}
            />
        </FormControl>

        <div css={css`
          display: flex;
          flex-direction: row;

          align-items: center;
        `}>
            <FormControl
                sx={{
                    mt: '16px',
                    width: "100%",
                    minWidth: "112px",
                    flex: 4
                }}
                required={true}
                error={!isDateValid}>
                <Input
                    readOnly={lock}
                    type="date"
                    id="time"
                    aria-describedby="date"
                    sx={{pl: 1}}
                    value={date}
                    onChange={event => {
                        setDate(event.target.value)
                        if (!isDateValid) setDateValid(true);
                    }}
                />
            </FormControl>

            <span css={css`
              padding-left: 16px;
              padding-right: 16px;
              margin-top: 16px;
            `}>
                с
            </span>

            <FormControl
                sx={{
                    flex: 2,
                    mt: '16px',
                    width: "100%",
                    minWidth: "81px"
                }}
                required={true}
                error={!isTimeValid}>
                <Input
                    readOnly={lock}
                    type="time"
                    id="time"
                    aria-describedby="time"
                    sx={{pl: 1}}
                    value={time}
                    onChange={event => {
                        setTime(event.target.value)
                        if (!isTimeValid) setTimeValid(true);
                    }}
                />
            </FormControl>

            <span css={css`
              display: flex;
              justify-content: space-between;

              flex: 1;

              padding-left: 16px;
              padding-right: 16px;
              margin-top: 16px;
            `}>
                до
                <span css={css`
                  padding-left: 8px;
                  font-weight: bold;
                `}>
                    {maxTimeHours}:{maxTimeMinutes}
                </span>
            </span>
        </div>

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
                    <Input
                        readOnly={lock}
                        id="address"
                        aria-describedby="address"
                        sx={{pl: 1}}
                        value={address}
                        onChange={event => {
                            setAddress(event.target.value)
                            if (!isAddressValid) setAddressValid(true);
                        }}/>
                </FormControl>
                : null}

            <div className={orderStyles.container}
                 style={(isAddressFormManual) ? {display: 'none'} : undefined}>

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
            {renderButtons()}
        </SpeedDial>
    </FormFrame>
}

function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null;
}

export default OrderComponent;