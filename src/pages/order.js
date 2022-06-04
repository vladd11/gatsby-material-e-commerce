import OrderComponent from '../components/OrderComponent'
import Api from '../api/api'

import React from 'react'
import Helmet from "react-helmet/es/Helmet";

import theme from "../theme";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {graphql, navigate, useStaticQuery} from "gatsby";

import UseFont from "../components/frames/UseFont";

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

    const {state = {}} = location
    if(!state) {
        // It's redirect and then() function never call.
        // noinspection JSIgnoredPromiseFromCall
        navigate("/")
        return
    }

    const {cartProducts} = state

    return <>
        <UseFont />
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>
        <ThemeProvider theme={theme}>
            <OrderComponent api={api} cartProducts={cartProducts}/>
        </ThemeProvider>
    </>
}
