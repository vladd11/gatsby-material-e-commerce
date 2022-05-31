import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
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

import {defaultFontFamily} from "../theme"
import getCurrentDateTime, {parseDateTime, addTime} from "../currentDateTime"

import CartProduct from "./CartProduct";

import * as orderStyles from "../styles/components/order.module.sass"
import 'mapbox-gl/dist/mapbox-gl.css';

// @ts-ignore
import mapboxgl from '!mapbox-gl';

import Api from "../api/api";
import Product from "../interfaces/product";
import redirect from "../redirect";
import Appbar from "./ui/Appbar";
import {css} from "@emotion/react";

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

    const [orderButtonLock, setOrderButtonLock] = useState(false)
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
        setOrderButtonLock(true);

        let valid = true;

        let clearPhone = replaceSpaces(phone)
        if (isEmptyOrSpaces(clearPhone) || clearPhone.length !== 10) {
            setPhoneValid(false);
            valid = false;
        }

        if (isEmptyOrSpaces(address) && isAddressFormManual) {
            setAddressValid(false);
            valid = false;
        }

        if (valid) {
            try {
                await redirect(await props.api.order(props.cartProducts, clearPhone, address, paymentMethod))
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

        setOrderButtonLock(false)
    }

    return <div className={orderStyles.order}>
        <Appbar title="Оформление заказа"/>

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

        <Typography sx={{marginLeft: "12px"}}>
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
            <Input inputMode="tel"
                   id="phone"
                   aria-describedby="tel"
                   sx={{pl: 1}}
                   value={phone}
                   onChange={event => {
                       setPhone(event.target.value)
                       if (!isPhoneValid) setPhoneValid(true);
                   }}
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
                    flex: 4
                }}
                required={true}
                error={!isDateValid}>
                <Input type="date"
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
                    width: "100%"
                }}
                required={true}
                error={!isTimeValid}>
                <Input type="time"
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
                    <Input id="address"
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
            <SpeedDialButton disabled={orderButtonLock}
                             tooltipText="Предоплата картой"
                             onClick={() => validateAndOrder("card")}>
                <CreditCardIcon/>
            </SpeedDialButton>

            <SpeedDialButton disabled={orderButtonLock}
                             tooltipText="Наличными при получении"
                             onClick={() => validateAndOrder("cash")}>
                <MoneyIcon/>
            </SpeedDialButton>
        </SpeedDial>
    </div>
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function replaceSpaces(str) {
    return str.replace(/[- ()]/, '')
}

export default OrderComponent;