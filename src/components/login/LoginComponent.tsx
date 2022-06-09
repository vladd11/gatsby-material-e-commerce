import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import Fab from "@mui/material/Fab";
import LoginIcon from '@mui/icons-material/Login';

import {SiteInfo} from "../../interfaces/data";


import Api from "../../api/api";
import ExpandedButtonLabel from "../ui/ExpandedButtonLabel";
import PhoneField from "../fields/PhoneField";
import CodeField from "../order/fields/CodeField";
import FormFrame from "../frames/FormFrame";

import {FabStyles} from "./loginStyles";
import {navigate} from "gatsby";

interface LoginComponentProps {
    siteMetadata: SiteInfo,
    api: Api
}

export default function LoginComponent(props: LoginComponentProps) {
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [code, setCode] = useState("");
    let statelessCode = "";
    const [codeError, setCodeError] = useState("");

    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step === 2) {
            // It's redirect, there's no reason to wait it
            // noinspection JSIgnoredPromiseFromCall
            navigate("/")
        }
    }, [step])

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Вход</title>
            <meta name="description" content="Вход в аккаунт"/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/login"/>
        </Helmet>

        <FormFrame title="Вход в аккаунт">
            {(step === 0)
                ? <>
                    <PhoneField value={phone} onChange={setPhone} lock={false} valid={phoneError === ""}
                                error={phoneError}/>
                    <Fab variant="extended" color="primary" sx={FabStyles} onClick={async () => {
                        try {
                            await props.api.sendCode(phone);
                            setStep(1);
                        } catch (e: any) {
                            if (e.code === 401) {
                                setPhoneError("Этот телефон не зарегистрирован")
                            }
                        }
                    }}>
                        <LoginIcon/>
                        <ExpandedButtonLabel>
                            Войти
                        </ExpandedButtonLabel>
                    </Fab>
                </>
                : <CodeField error={codeError} valid={codeError === ""} lock={false}
                             value={code}
                             onChange={(code) => {
                                 statelessCode = code;
                                 setCode(code)
                                 setCodeError("")
                             }}
                             onApply={oldValue => {
                                 if (oldValue === statelessCode) {
                                     try {
                                         setStep(2)
                                     } catch (e: any) {
                                         if (e.code === 1001) {
                                             setCodeError("Неверный SMS-код");
                                         } else if (e.code === 1004) {
                                             setCodeError("Срок действия кода истёк");
                                         } else throw e;
                                     }
                                 }
                             }}/>
            }
        </FormFrame>
    </>
}