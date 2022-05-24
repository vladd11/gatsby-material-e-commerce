import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {css, Global} from "@emotion/react";

import Chip from "@mui/material/Chip";

import Main from '../components/Main'
import Product from '../components/Product'

import queries from "../queries"

import {getImage} from "gatsby-plugin-image";
import useStickyState from "../stickyState";

import Data from "../interfaces/data";

import theme from "../theme"

interface IndexProps {
    data: Data
}

function Index(props: IndexProps) {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')
    const [currentCategory, setCurrentCategory] = useState(0)

    const [products, setProducts] = useState(props.data.allProducts.nodes)

    useEffect(() => {
        if(currentCategory === 0) {
            setProducts(props.data.allProducts.nodes)
        } else {
            fetch(`categories/${currentCategory}.json`).then(async r => {
                setProducts(await r.json())
            })
        }
    }, [currentCategory])

    function renderProducts() {
        return products.map((product, index) => {
            product.Image = getImage(props.data.allFile.edges.find(value => value.node.relativePath === product.ImageURI).node)

            return <Product
                disabled={cartProducts.some(cartProduct =>
                    cartProduct.ProductID === product.ProductID
                )}
                product={product}
                whenAddedToCart={() => {
                    product.count = 1;
                    setCartProducts([...cartProducts, product])
                }}
                loading={(index > 3) ? "lazy" : "eager"}
            />
        });
    }

    return (<div>
        <Global styles={css`
          body {
            font-family: ${theme.typography.fontFamily};
          }
        `}/>
        <Helmet htmlAttributes={{
            lang: 'ru',
        }}>
            <title>{props.data.site.siteMetadata.title}</title>
            <meta name="description" content={props.data.site.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <Main
            info={props.data.site.siteMetadata}
            cartProducts={cartProducts}
            onDelete={(index: number) => {
                setCartProducts(cartProducts.filter((value, arrIndex) => {
                    return index !== arrIndex;
                }))
            }}>

            <div css={css`
              padding: 16px 16px 0;
            `}>
                {
                    props.data.site.siteMetadata.categories.map((value) =>
                        <Chip
                            disabled={currentCategory === value.id}
                            sx={{margin: "0 4px"}}
                            label={value.name} clickable onClick={() => {
                            setCurrentCategory(value.id)
                        }}/>)
                }
            </div>

            <div css={css`
              display: flex;
              flex-wrap: wrap;

              @media ${queries.mobile} {
                justify-content: center
              }
            `}>
                {renderProducts()}
            </div>
        </Main>
    </div>);
}

export default Index
