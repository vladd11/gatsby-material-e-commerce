import OrderComponent from '../components/OrderComponent'
import Api from '../api/api'

import React from 'react'
import Helmet from "react-helmet/es/Helmet";

import theme from "../theme";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {graphql, useStaticQuery} from "gatsby";

const Order = () => {
    const api = new Api(process.env.GATSBY_FUNCTION_URL, localStorage.getItem("jwt_token"))

    const data = useStaticQuery(graphql`
{
  allContent {
    nodes {
      Category
      Description
      Price
      ProductID
      Title
      ImageURI
    }
  }
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
      
      functionURL
    }
  }
}`)

    return <ThemeProvider theme={theme}>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Оформление заказа</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,

            background: theme.palette.info.light
        }}>
            <OrderComponent api={api}/>
        </div>
    </ThemeProvider>
}

export default Order;
