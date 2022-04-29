import * as React from 'react';
import Main from '../components/Main'
import Product from '../components/Product'
import theme from '../theme'
import {ThemeProvider} from "@mui/material/styles";
import {graphql, useStaticQuery} from "gatsby";
import {getImage} from "gatsby-plugin-image";
import useStickyState from "../stickyState";

export default function Index() {
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
    }
  }
}`)

    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')

    const products = data.allContent.nodes.map((product) => {
        product.Image = getImage(data.allFile.edges.find(value => value.node.relativePath === product.ImageURI).node)

        return <Product product={product} whenAddedToCart={() => {
            setCartProducts([...cartProducts, product])
        }}/>
    });

    return (<ThemeProvider theme={theme}>
        <Main info={data.site.siteMetadata} cartProducts={cartProducts}>
            {products}
        </Main>
    </ThemeProvider>);
}
