import OrderComponent from '../components/OrderComponent'
import React from 'react'
import theme from "../theme";
import {Helmet} from "react-helmet";
import {ThemeProvider} from "@mui/material/styles";
import {graphql, useStaticQuery} from "gatsby";

const Order = () => {
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
            <OrderComponent/>
        </div>
    </ThemeProvider>
}

export default Order;
