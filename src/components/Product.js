import React from 'react'
import Typography from "@mui/material/Typography";
import {GatsbyImage} from "gatsby-plugin-image";

const Product = ({product}) => {
    return <>
        <Typography>
            {product.Title}
        </Typography>
        <Typography>
            {product.Description}
        </Typography>
        <GatsbyImage image={product.ImageURI} alt={product.Title}></GatsbyImage>
    </>
}

export default Product