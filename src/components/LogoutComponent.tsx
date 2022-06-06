import {Helmet} from "react-helmet";
import React, {useEffect} from "react";

import {SiteInfo} from "../interfaces/data";
import Main from "./Main";
import useStickyState from "../localStorageState";
import {css} from "@emotion/react";

interface LogoutComponentProps {
    siteMetadata: SiteInfo
}

export default function LogoutComponent(props: LogoutComponentProps) {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts');

    useEffect(() => {

    }, [])

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.siteMetadata.title} | Выход</title>
            <meta name="description" content="Выход из аккаунта"/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/logout"/>
        </Helmet>
        <Main info={props.siteMetadata}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}>
            <div css={css`
              height: 100%;

              display: flex;
              justify-content: center;
              align-items: center;
            `}>
                Вы вышли из своего аккаунта.
            </div>
        </Main>
    </>
}