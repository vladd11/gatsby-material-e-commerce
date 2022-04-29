import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";
import {Button, Card, CardContent, CardHeader, CardMedia} from "@mui/material";

import * as cardStyles from '../styles/product-styles.module.css'
import Typography from "@mui/material/Typography";

const Product = ({product, whenAddedToCart}) => {
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
            <GatsbyImage className={cardStyles.image} alt={product.Title} image={product.Image}/>
        </CardMedia>

        <Button size="small" style={{width: "100%", padding: "8px"}} onClick={whenAddedToCart}>
            Добавить в корзину
        </Button>
    </Card>
}

export default Product