import theme from "../theme";
import {Helmet} from "react-helmet";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ThemeProvider} from "@mui/material/styles";
import React from "react";
import {graphql, useStaticQuery} from "gatsby";
import useStickyState from "../stickyState";
import Typography from "@mui/material/Typography";
import {AppBar, Divider, Fab, List, Toolbar} from "@mui/material";
import CartProduct from "../components/CartProduct";
import IsMobile from "../isMobile";

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
      phone
      
      address
      addressLink
      
      functionURL
    }
  }
}`)
    const mobile = IsMobile();
    const [cartProducts] = useStickyState([], 'cartProducts')

    return <ThemeProvider theme={theme}>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title} | Заказ</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Оформление заказа
                </Typography>
            </Toolbar>
        </AppBar>

        <List style={{display: "flex", flexDirection: "row"}}>
            {
                cartProducts.map(cartProduct => {
                    return <CartProduct product={cartProduct}/>
                })
            }
        </List>

        <Typography sx={{marginLeft: "12px"}}>
            Итого:
            <span style={{paddingLeft: "4px", fontWeight: "bold"}}>
                {cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) / 100} рублей
            </span>
        </Typography>

        <Divider style={{borderBottomWidth: "medium", marginTop: '4px'}} />

        <Fab color="primary" aria-label="Заказать" variant="extended" style={{textTransform: 'initial'}}
             sx={(mobile)
                 ? {position: "fixed", right: "16px", bottom: "16px"}
                 : {position: "fixed", right: "48px", bottom: "32px", transform: 'scale(1.5)'}}>

            <LocalShippingIcon sx={{mr: 1}}/>
            Заказать
        </Fab>
    </ThemeProvider>
}

export default Order;
