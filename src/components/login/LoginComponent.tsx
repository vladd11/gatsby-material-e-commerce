import React, {useState} from "react";
import {Helmet} from "react-helmet";

import {SiteInfo} from "../../interfaces/data";
import FormFrame from "../frames/FormFrame";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Fab from "@mui/material/Fab";

interface LoginComponentProps {
    siteMetadata: SiteInfo
}

export default function LoginComponent(props: LoginComponentProps) {
    const [isLastLoginSuccessful, setLastLoginSuccessful] = useState(true);
    const [login, setLogin] = useState("");

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Вход</title>
            <meta name="description" content="Вход в аккаунт"/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/login"/>
        </Helmet>

        <FormFrame title="Вход в аккаунт">
            <form action={`${process.env.GATSBY_FUNCTION_URL}/login`} method="POST">
                <FormControl
                    required={true}
                    error={!isLastLoginSuccessful}>
                    <Input
                        type="login"
                        id="phone"
                        aria-describedby="phone"
                        sx={{pl: 1}}
                        value={login}
                        onChange={event => {
                            setLogin(event.target.value)
                        }}
                    />
                </FormControl>
            </form>

            <Fab color="primary" sx={{position: "absolute"}}>

            </Fab>
        </FormFrame>
    </>
}