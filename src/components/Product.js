import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import * as cardStyles from '../styles/product-styles.module.sass'

const Product = ({product, whenAddedToCart, disabled, loading="lazy"}) => {
    return <Card className={cardStyles.card}>
        <CardHeader title={product.Title}/>

        <CardContent style={{display: "flex", justifyContent: "space-between", paddingTop: 0}}>
            <Typography>
                {product.Description}
            </Typography>
            <Typography>
                {product.Price / 100} рублей
            </Typography>
        </CardContent>

        <CardMedia>
            <GatsbyImage loading={loading} className={cardStyles.image} alt={product.Title} image={product.Image}/>
        </CardMedia>

        <Button size="small" style={{width: "100%", padding: "8px"}} onClick={whenAddedToCart} disabled={disabled}>
            {(disabled) ? "Добавлено" : "Добавить в корзину"}
        </Button>
    </Card>
}

export default Product