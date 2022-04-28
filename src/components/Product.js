import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";
import {Card, CardHeader, CardMedia} from "@mui/material";

import * as cardStyles from '../styles/card-styles.module.css'

const Product = ({product}) => {
    return <Card className={cardStyles.card}>
        <CardHeader title={product.Title} />
        <CardMedia>
            <GatsbyImage className={cardStyles.image} alt={product.Title} image={product.ImageURI} />
        </CardMedia>
    </Card>
}

export default Product