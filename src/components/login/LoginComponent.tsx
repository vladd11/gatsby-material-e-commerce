import React, {useState} from "react";
import {Helmet} from "react-helmet";

import Fab from "@mui/material/Fab";
import LoginIcon from '@mui/icons-material/Login';

import {SiteInfo} from "../../interfaces/data";

import Api from "../../api/api";
import ExpandedButtonLabel from "../ui/ExpandedButtonLabel";
import PhoneField from "../fields/PhoneField";
import FormFrame from "../frames/FormFrame";

import {FabStyles} from "./loginStyles";
import {navigate} from "gatsby";

interface LoginComponentProps {
    siteMetadata: SiteInfo,
    api: Api
}

// This is Russian phone length.
// TODO: Need to add support for another country numbers
const PHONE_LENGTH = 10;

export default function LoginComponent(props: LoginComponentProps) {
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    async function sendCode() {
        if (phone.length !== PHONE_LENGTH) {
            setPhoneError("Номер должен состоять из 12 цифр")
            return
        }

        try {
            await props.api.sendCode(phone);
            await navigate("/confirm", {
                state: {
                    phone: `+7${phone}`
                }
            });
        } catch (e: any) {
            if (e.code === 401) {
                setPhoneError("Этот телефон не зарегистрирован")
            }
        }
    }

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Вход</title>
            <meta name="description" content="Вход в аккаунт"/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/login"/>
        </Helmet>

        <FormFrame title="Вход в аккаунт">
            <PhoneField value={phone} onChange={(value: any) => {
                setPhone(value)
                setPhoneError("")
            }} lock={false} valid={phoneError === ""}
                        error={phoneError}/>
            <Fab variant="extended" color="primary" sx={FabStyles} onClick={sendCode}>
                <LoginIcon/>
                <ExpandedButtonLabel>
                    Войти
                </ExpandedButtonLabel>
            </Fab>
        </FormFrame>
    </>
}