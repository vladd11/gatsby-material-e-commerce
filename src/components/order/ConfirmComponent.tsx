import React, {useState} from "react";
import {css} from "@emotion/react";
import Helmet from "react-helmet";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import FormFrame from "../frames/FormFrame";
import CodeField from "../fields/CodeField";
import Api from "../../api/api";

interface ConfirmComponentProps {
    siteMetadata: {
        title: string,
        description: string
    },
    phone: string,
    api: Api,
    onSubmit: (code: number) => void
}

export default function ConfirmComponent(props: ConfirmComponentProps) {
    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const [timeToResend, setTimeToResend] = useState(60);

    let statelessCode: string;

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
                    {props.phone}
                </Typography>
            </div>

            <CodeField
                error={codeError}
                valid={codeError === ""}

                lock={false}

                value={code}
                onChange={value => {
                    statelessCode = value;
                    setCode(value)
                    setCodeError("")
                }}
                onApply={async (oldValue) => {
                    if (oldValue == statelessCode) {
                        try {
                            props.onSubmit(parseInt(statelessCode, 10))
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
                        await props.api.resendCode(JSON.parse(props.phone))
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