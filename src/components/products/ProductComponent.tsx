import React from "react";
import {IGatsbyImageData} from "gatsby-plugin-image";

import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import type Product from "../../types/product";
import type {SiteInfo} from "../../types/data";

import Carousel from "../carousel/CarouselComponent";
import {Header} from "./productStyles";

import Main from "../Main";
import useStickyState from "../../states/localStorageState";

type ProductProps = {
    info: SiteInfo,
    product: Product,
    getImage: (uri: string) => IGatsbyImageData
}

export default function ProductComponent(props: ProductProps) {
    const [cartProducts, setCartProducts] = useStickyState([], 'cartProducts')

    return <Main cartProducts={cartProducts} setCartProducts={setCartProducts} info={props.info}>
        <Carousel elements={
            props.product.Images!.map(img => {
                return {
                    alt: img.alt,
                    image: props.getImage(img.image_uri)
                }
            })}/>
        <Header>
            <CardHeader title={props.product.Title} subheader={`${props.product.Price} рублей`}/>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Header>
    </Main>
}