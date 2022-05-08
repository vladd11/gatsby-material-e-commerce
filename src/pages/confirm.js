import React, {useEffect, useState} from "react";
import {graphql, useStaticQuery} from "gatsby";

import * as orderStyles from "../styles/components/order.module.sass";
import * as confirmStyles from "../styles/components/confirm.module.sass"

import Api from "../api/api";
import Helmet from "react-helmet";
import Appbar from "../components/ui/Appbar";
import Input from "../components/ui/Input";
import InputHelper from "../components/ui/InputHelper";

const Confirm = ({location}) => {
    const api = new Api()
    useEffect(() => {
        api.jwtToken = localStorage.getItem("jwt_token")
    })

    const data = useStaticQuery(graphql`
{
  site {
    siteMetadata {
      title
      description
    }
  }
}`)

    const [code, setCode] = useState("")
    const [timeToResend, setTimeToResend] = useState(60);
    const [codeError, setCodeError] = useState("")
    const [lockButton, setLockButton] = useState(false)

    setTimeout(() => {
        if (timeToResend !== 0) {
            setTimeToResend(timeToResend - 1)
        }
    }, 1000)

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Подтверждение номера телефона</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/confirm"/>
        </Helmet>
        <div className={confirmStyles.root}>
            <div className={orderStyles.order}>
                <Appbar title="Подтвердите номер телефона"/>

                <div className={confirmStyles.phoneCard}>
                    <span>
                        Ваш номер телефона:
                    </span>
                    <b className={confirmStyles.phoneText}>
                        {location.state.phone}
                    </b>
                </div>

                <Input className={confirmStyles.input} type="numeric" id="code" value={code} error={!!codeError}
                       onChange={event => {
                           const prev = event.target.value;
                           setCode(event.target.value)
                           setCodeError("")

                           if (event.target.value.length === 6) {
                               setTimeout(async () => {
                                   if (event.target.value === prev) {
                                       // noinspection EqualityComparisonWithCoercionJS
                                       try {
                                           const result = await api.sendCodeAndOrder(location.state.cartProducts, location.state.address, location.state.paymentMethod, location.state.phone, prev)

                                           console.log(result)

                                           if (result) {
                                               window.location.replace(result)
                                           }
                                       } catch (e) {
                                           console.error(e)
                                           if (e.code === 1001) {
                                               setCodeError("Неверный SMS-код");
                                           } else if (e.code === 1004) {
                                               setCodeError("Срок действия кода истёк");
                                           }
                                       }
                                   }
                               }, 1000)

                           }
                       }}>
                    Код
                </Input>
                <InputHelper error={!!codeError}>
                    {(codeError === "") ? "Код будет проверен автоматически." : codeError}
                </InputHelper>
                <button
                    style={(timeToResend !== 0 || lockButton) ? null : {
                        justifyContent: "center",
                        color: "#556cd6",
                        pointerEvents: "all",
                        cursor: "pointer"
                    }}
                    className={confirmStyles.button}
                    disabled={timeToResend !== 0 || lockButton}
                    onClick={async () => {
                        setLockButton(true)

                        await api.resendCode(JSON.parse(localStorage.getItem("phone")));
                        setTimeToResend(60);
                    }}>
                    Отправить СМС заново
                    {(timeToResend === 0) ? null : <span>{timeToResend}</span>}
                </button>
            </div>
        </div>
    </>
}

export default Confirm;
