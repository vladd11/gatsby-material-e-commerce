import * as React from 'react';
import Main from '../components/Main'
import theme from '../theme'
import {ThemeProvider} from "@mui/material/styles";
import {graphql, StaticQuery} from "gatsby";
import Product from "../components/Product";
import {getImage} from "gatsby-plugin-image";

export default function Index() {
    return (<ThemeProvider theme={theme}>
        <Main>
            <StaticQuery query={graphql`
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
}`} render={data => {
                return data.allContent.nodes.map(product => {
                    product.ImageURI = getImage(data.allFile.edges.find(value => value.node.relativePath === product.ImageURI).node)
                    return <Product product={product}/>
                })
            }}/>
        </Main>
    </ThemeProvider>);
}
