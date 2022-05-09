import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {css} from "@emotion/react";

const CartProduct = ({product, children}) => {
    return <Card sx={{
        minWidth: "200px",
        margin: "12px"
    }}>
        <div css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}>
            <CardHeader title={product.Title} subheader={`${product.Price} рублей`}/>
            {children}
        </div>

        <GatsbyImage css={css`min-width: 100%`} alt={product.Title} image={product.Image}/>
    </Card>
}

export default CartProduct;
