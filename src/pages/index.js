import * as React from 'react';
import Main from '../components/Main'
import theme from '../theme'
import {ThemeProvider} from "@mui/material/styles";
import {graphql, StaticQuery} from "gatsby";
import Product from "../components/Product";

export default function Index() {
    return (<ThemeProvider theme={theme}>
        <Main>
            <StaticQuery query={graphql`
            query {
                  allContent {
                    nodes {
                      Category
                      Description
                      Price
                      ProductID
                      Title
                      
                      ImageURI {
                          childImageSharp {
                            gatsbyImageData(width: 200)
                          }
                      }
                    }
                  }
            }`} render={data => {
                return data.allContent.nodes.map((product, index) => {
                    console.log(product)
                    return <Product product={product}/>
                })
            }}/>
        </Main>
    </ThemeProvider>);
}
