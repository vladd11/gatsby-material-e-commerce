import OrderComponent from '../components/OrderComponent'
import Api from '../api/api'

import React, {useEffect} from 'react'
import Helmet from "react-helmet/es/Helmet";

import theme from "../theme";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {graphql, navigate, useStaticQuery} from "gatsby";

import * as orderPageStyles from "../styles/components/order-page.module.sass"
import {css, Global} from "@emotion/react";

export default function Order({location}) {
    const data = useStaticQuery(graphql`
{
  allFile {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  }
  site {
    siteMetadata {
      title
      description
    }
  }
}`)

    const api = new Api()
    useEffect(() => {
        api.jwtToken = localStorage.getItem("jwt_token")
    })

    const {state = {}} = location
    if(state === null) {
        navigate("/")
        return
    }

    const {cartProducts} = state

    return <>
        <Global styles={css`
          body {
            font-family: ${theme.typography.fontFamily};
          }
        `}/>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>
        <ThemeProvider theme={theme}>
            <div className={orderPageStyles.root}>
                <OrderComponent api={api} cartProducts={cartProducts}/>
            </div>
        </ThemeProvider>
    </>
}
