import * as React from 'react';
import {useState} from 'react';
import {Helmet} from "react-helmet";

import Main from '../components/Main'
import Product from '../components/Product'

import theme from '../theme'
import {ThemeProvider} from "@mui/material/styles";
import {graphql, useStaticQuery} from "gatsby";

import {getImage} from "gatsby-plugin-image";
import useStickyState from "../stickyState";
import Chip from "@mui/material/Chip";

import * as indexStyles from "../styles/index.module.sass"

export default function Index() {
    const data = useStaticQuery(graphql`
{
  allProducts {
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
    }
  }
}`)

    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')
    const [currentCategory, setCurrentCategory] = useState(0)

    const products = data.allProducts.nodes.map((product) => {
        if (currentCategory === 0) {
            product.Image = getImage(data.allFile.edges.find(value => value.node.relativePath === product.ImageURI).node)

            return <Product
                disabled={cartProducts.some(cartProduct =>
                    cartProduct.ProductID === product.ProductID
                )}
                product={product}
                whenAddedToCart={() => {
                    product.count = 1
                    setCartProducts([...cartProducts, product])
                }}
            />
        } else {
            return <div/>;
        }
    });

    return (<ThemeProvider theme={theme}>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{data.site.siteMetadata.title}</title>
            <meta name="description" content={data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <Main info={data.site.siteMetadata} cartProducts={cartProducts} data={data}>
            <div className={indexStyles.chips}>
                <Chip label="Пиццы" className={indexStyles.chip} clickable onClick={() => {
                    setCurrentCategory(0)
                }}/>
            </div>

            <div className={indexStyles.products}>
                {products}
            </div>
        </Main>
    </ThemeProvider>);
}
