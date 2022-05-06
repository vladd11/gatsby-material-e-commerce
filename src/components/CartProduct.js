import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"

import * as cartStyles from "../styles/components/cart-product.module.sass";
import * as cardStyles from "../styles/components/product.module.sass";

const CartProduct = ({product, children}) => {
    return <div className={cartStyles.cartProduct}>
        <div className={cartStyles.header}>
            <CardHeader title={product.Title} subheader={`${product.Price / 100} рублей`}/>

            {children}
        </div>

        <CardMedia>
            <GatsbyImage className={cardStyles.image} alt={product.Title} image={product.Image}/>
        </CardMedia>
    </div>
}

export default CartProduct;
