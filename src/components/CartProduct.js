import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import * as cartStyles from "../styles/components/cart-product.module.sass";
import * as cardStyles from "../styles/components/product.module.sass";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const CartProduct = ({product, children}) => {
    return <Card className={cartStyles.cartProduct} sx={{minWidth: "200px"}}>
        <div className={cartStyles.header}>
            <CardHeader title={product.Title} subheader={`${product.Price} рублей`} />
            {children}
        </div>

        <GatsbyImage className={cardStyles.image} alt={product.Title} image={product.Image}/>
    </Card>
}

export default CartProduct;
