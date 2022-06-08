import React, {useState} from "react";
import {css} from "@emotion/react";
import Helmet from "react-helmet";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import FormFrame from "../frames/FormFrame";

import Product from "../../interfaces/product";

import CodeField from "./fields/CodeField";
import redirect from "../../redirect";
import Api from "../../api/api";

export interface ConfirmComponentState {
    cartProducts: Array<Product>,
    address: string,
    paymentMethod: string,
    phone: string,
    time: Date
}

interface ConfirmComponentProps {
    state: ConfirmComponentState;
    siteMetadata: {
        title: string,
        description: string
    };
    api: Api
}

export default function ConfirmComponent(props: ConfirmComponentProps) {
    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const [timeToResend, setTimeToResend] = useState(60);

    setTimeout(() => {
        if (timeToResend !== 0) {
            setTimeToResend(timeToResend - 1)
        }
    }, 1000)

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Подтверждение номера телефона</title>
            <meta name="description" content={props.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/confirm"/>
        </Helmet>
        <FormFrame title="Подтвердите номер телефона">
            <div css={css`
              margin-top: 8px;
              margin-left: 12px;
            `}>
                <span>
                    Ваш номер телефона:
                </span>
                <Typography sx={{
                    ml: "8px",
                    fontWeight: "bold"
                }} component="span">
                    {props.state.phone}
                </Typography>
            </div>

            <CodeField
                error={codeError}
                valid={codeError === ""}

                lock={false}

                value={code}
                onChange={value => {
                    setCode(value)
                    setCodeError("")
                }}
                onApply={async (oldValue) => {
                    if (oldValue === code) {
                        try {
                            await redirect(await props.api.sendCodeAndOrder(
                                props.state.cartProducts,
                                props.state.phone,
                                props.state.address,
                                props.state.paymentMethod,
                                props.state.time,
                                oldValue))
                        } catch (e: any) {
                            if (e.code === 1001) {
                                setCodeError("Неверный SMS-код");
                            } else if (e.code === 1004) {
                                setCodeError("Срок действия кода истёк");
                            } else throw e;
                        }
                    }
                }}/>

            <Button sx={{
                width: '100%',
                justifyContent: (timeToResend === 0) ? "center" : "space-between",
            }}
                    disabled={timeToResend !== 0}
                    onClick={async () => {
                        await props.api.resendCode(JSON.parse(props.state.phone))
                        setTimeToResend(60);
                    }}>
                Отправить СМС заново
                {
                    (timeToResend === 0)
                        ? null
                        : <span>{timeToResend}</span>
                }
            </Button>
        </FormFrame>
    </>
}