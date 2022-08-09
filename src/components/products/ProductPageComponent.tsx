import React from "react";
import {css} from "@emotion/react";
import {IGatsbyImageData} from "gatsby-plugin-image";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Carousel from "../carousel/CarouselComponent";
import Main from "../Main";

import {Description, Header, Root, Segment} from "./productPageStyles"

import type Product from "../../types/product";
import ProductType from "../../types/product";
import useStickyState from "../../states/localStorageState";
import queries from "../../queries";
import {Helmet} from "react-helmet";

type ProductProps = {
    info: Queries.SiteMetadata,
    product: Product,
    getImage: (uri: string) => IGatsbyImageData,
    getBigImage: (uri: string) => IGatsbyImageData,
    getDescription: (uri: string) => string,
    getRawDescription: (uri: string) => string
}

export default function ProductPageComponent(props: ProductProps) {
    const [cartProducts, setCartProducts] = useStickyState<Product[]>([], 'cartProducts')

    return <Main getImage={props.getImage}
                 cartProducts={cartProducts} setCartProducts={setCartProducts}
                 info={props.info}>
        <Helmet title={`${props.product.Title} - ${props.info.title}`}>
            <meta name="description" content={props.getRawDescription(props.product.DescriptionURI)} />
            <link rel="canonical" href="https://gatsby-test-nuk.pages.dev/login"/>
        </Helmet>
        <Root>
            <Segment>
                <Carousel elements={
                    props.product.Images?.map(img => {
                        return {
                            alt: img.alt,
                            image: props.getBigImage(img.image_uri)
                        }
                    }) ?? []}/>
            </Segment>

            <Segment>
                <Header>
                    <CardHeader css={css`
                      flex: 2;
                      border: 1px solid rgba(0, 0, 0, 0.1);

                      ${queries.large} {
                        border: none;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                      }
                    `} title={props.product.Title} subheader={`${props.product.Price} рублей`}/>

                    <Button css={css`
                      border-radius: 0;
                      padding: 32px;

                      flex: 1;

                      border: 1px solid rgba(0, 0, 0, 0.1);
                      border-left: none;

                      ${queries.large} {
                        border: none;
                      }
                    `}
                            disabled={cartProducts?.some((cartProduct: ProductType) => cartProduct.ProductID === props.product.ProductID)}
                            onClick={() => setCartProducts([...cartProducts, props.product])}>
                        Добавить в корзину
                    </Button>
                </Header>
            </Segment>
        </Root>

        <Description dangerouslySetInnerHTML={{__html: props.getDescription(props.product.DescriptionURI)}}/>
    </Main>
}