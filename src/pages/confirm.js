import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import React, {useState} from "react";
import {graphql, useStaticQuery} from "gatsby";

import * as orderStyles from "../styles/order.module.css";
import * as confirmStyles from "../styles/confirm.module.css"

import theme from "../theme";

import Api from "../api/api";
import Button from "@mui/material/Button";
import Helmet from "react-helmet";

const Confirm = () => {
    const api = new Api()

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
        <ThemeProvider theme={theme}>
            <div style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,

                background: theme.palette.info.light
            }}>
                <div className={orderStyles.order}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Подтвердите номер телефона
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div className={confirmStyles.phoneCard}>
                        <Typography component="span">
                            Ваш номер телефона:
                        </Typography>
                        <Typography sx={{
                            ml: "8px",
                            fontWeight: "bold"
                        }} component="span">
                            +79170324874
                        </Typography>
                    </div>

                    <FormControl
                        required={true}
                        style={{width: "100%"}}
                        error={codeError !== ""}
                        sx={{mt: '8px', mb: '8px'}}>

                        <InputLabel htmlFor="phone">Код</InputLabel>
                        <Input inputmode="numeric" id="phone" aria-describedby="code" sx={{pl: 1}} value={code}
                               onChange={event => {
                                   const prev = event.target.value;
                                   setCode(event.target.value)
                                   setCodeError("")

                                   if (event.target.value.length === 6) {
                                       setTimeout(async () => {
                                           if (event.target.value === prev) {
                                               // noinspection EqualityComparisonWithCoercionJS
                                               try {
                                                   const result = await api.sendCodeAndOrder(
                                                       JSON.parse(localStorage.getItem("cartProducts")),
                                                       JSON.parse(localStorage.getItem("address")),
                                                       localStorage.getItem("paymentMethod"),
                                                       JSON.parse(localStorage.getItem("phone")),
                                                       prev)

                                                   if (result) {
                                                       window.location.replace(result)
                                                   }
                                               } catch (e) {
                                                   if (e.code === 1001) {
                                                       setCodeError("Неверный SMS-код");
                                                   } else if (e.code === 1004) {
                                                       setCodeError("Срок действия кода истёк");
                                                   }
                                               }
                                           }
                                       }, 1000)

                                   }
                               }}/>
                        <FormHelperText>
                            {(codeError === "") ? "Код будет проверен автоматически." : codeError}
                        </FormHelperText>
                    </FormControl>
                    <Button sx={{
                        width: '100%',
                        justifyContent: (timeToResend === 0) ? "center" : "space-between",
                    }}
                            disabled={timeToResend !== 0}
                            onClick={async () => {
                                await api.resendCode(JSON.parse(localStorage.getItem("phone")))
                                setTimeToResend(60);
                            }}>
                        Отправить СМС заново
                        {
                            (timeToResend === 0)
                                ? null
                                : <Typography>{timeToResend}</Typography>
                        }
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    </>
}

export default Confirm;
