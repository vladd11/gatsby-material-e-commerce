import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"

import * as cartStyles from "../styles/cart-styles.module.css";
import * as cardStyles from "../styles/product-styles.module.css";

const CartProduct = ({product}) => {
  return <Card className={cartStyles.cartProduct} style={{minWidth: "150px"}}>
      <CardHeader title={product.Title} subheader={`${product.Price / 100} рублей`} />

      <CardMedia>
          <GatsbyImage className={cardStyles.image} alt={product.Title} image={product.Image} />
      </CardMedia>
  </Card>
}

export default CartProduct;
