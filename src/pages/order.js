import OrderComponent from '../components/OrderComponent'
import Api from '../api/api'

import React, {useEffect} from 'react'
import Helmet from "react-helmet/es/Helmet";

import theme from "../theme";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {graphql, useStaticQuery} from "gatsby";

import * as orderPageStyles from "../styles/components/order-page.module.sass"

const Order = ({location}) => {
    const api = new Api()

    useEffect(() => {
        api.jwtToken = localStorage.getItem("jwt_token")
    })

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

    return <>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>
        <ThemeProvider theme={theme}>
            <div className={orderPageStyles.root}>
                <OrderComponent api={api}/>
            </div>
        </ThemeProvider>
    </>
}

export default Order;