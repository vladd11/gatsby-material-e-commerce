import React, {useState} from 'react';
import {Helmet} from "react-helmet";

import Main from '../components/Main'
import Product from '../components/Product'

import {getImage} from "gatsby-plugin-image";
import useStickyState from "../stickyState";

import * as indexStyles from "../styles/components/index.module.sass"
import Data from "../interfaces/Data";

interface IndexProps {
    data: Data
}

const Index = (props: IndexProps) => {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')
    const [currentCategory, setCurrentCategory] = useState(0)

    const products = props.data.allProducts.nodes.map((product, index) => {
        if (currentCategory === 0) {
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
                loading={(index > 5) ? "lazy" : "eager"}
            />
        } else {
            return <div/>;
        }
    });

    return (<div className={indexStyles.root}>
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
            {/*<div className={indexStyles.chips}>
                <Chip label="Пиццы" className={indexStyles.chip} clickable onClick={() => {
                    setCurrentCategory(0)
                }}/>
            </div>*/}

            <div className={indexStyles.products}>
                {products}
            </div>
        </Main>
    </div>);
}

export default Index
