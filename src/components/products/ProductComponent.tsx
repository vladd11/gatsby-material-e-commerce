import React from "react";
import {getImage} from "gatsby-plugin-image";

import type ProductType from "../../interfaces/product"
import Carousel from "../carousel/CarouselComponent";

type ProductProps = {
    product: ProductType
}

export default function ProductComponent(props: ProductProps) {
    return <Carousel elements={[
        {
            alt: "",
            image: getImage(props.product.Image!)!
        },
        {
            alt: "",
            image: getImage(props.product.Image!)!
        },
        {
            alt: "",
            image: getImage(props.product.Image!)!
        }
    ]}/>
}