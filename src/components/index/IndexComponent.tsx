import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";

import Chip from "../ui/Chip";

import Main from '../Main'
import Product from '../product/Product'

import useStickyState from "../../states/localStorageState";

import ProductType from "../../types/product"
import categories from "../../../categories";

import {Categories, Products} from "./IndexStyles"
import {getDescriptionByPath, getImageByPath} from "../../../getResourceByPath";
import {IGatsbyImageData} from "gatsby-plugin-image";

interface IndexProps {
    data: Queries.IndexPageQuery,
    getImage: (imageUri: string) => IGatsbyImageData
}

function IndexComponent(props: IndexProps) {
    const [cartProducts, setCartProducts] = useStickyState<ProductType[]>([], 'cartProducts')
    const [currentCategory, setCurrentCategory] = useState(0)

    const [products, setProducts] = useState(props.data.allProducts.nodes)

    useEffect(() => {
        if (currentCategory === 0) {
            setProducts(props.data.allProducts.nodes)
        } else {
            fetch(`categories/${currentCategory}.json?time=${props.data.allSiteBuildMetadata.nodes[0].buildTime}`)
                .then(async r => {
                    setProducts(await r.json())
                })
        }
    }, [currentCategory])

    function renderProducts() {
        return products.map((product, index) => {
            return <Product
                getImage={(uri) => getImageByPath(props.data.allFile!.edges!, uri)!}
                getDescription={(uri) => getDescriptionByPath(props.data.shortTexts!.nodes!, uri)!}

                disabled={cartProducts?.some((cartProduct: ProductType) => cartProduct.ProductID === product.ProductID)}
                product={product}
                whenAddedToCart={() => setCartProducts([...cartProducts, product])}
                loading={(index > 3) ? "lazy" : "eager"}
            />
        });
    }

    function renderCategories() {
        return categories.map((category) => {
            return <Chip
                avatar={category.icon}
                disabled={currentCategory === category.id}
                label={category.name}
                onClick={() => setCurrentCategory(category.id)}
            />;
        })
    }

    return (<>
        <Helmet htmlAttributes={{lang: 'ru'}}>
            <title>{props.data.site!.siteMetadata.title}</title>
            <meta name="description" content={props.data.site!.siteMetadata.description}/>
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/"/>
        </Helmet>

        <Main
            getImage={props.getImage}
            info={props.data.site!.siteMetadata}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}>

            <Categories>
                {renderCategories()}
            </Categories>

            <Products>
                {renderProducts()}
            </Products>
        </Main>
    </>);
}

export default IndexComponent
