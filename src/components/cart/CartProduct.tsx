import React, {ReactNode} from 'react'
import {css} from "@emotion/react";
import {GatsbyImage} from "gatsby-plugin-image";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Product from "../../interfaces/product";

interface CartProductProps {
    product?: Product,
    children?: ReactNode
}

export default function CartProduct(props: CartProductProps) {
    return <Card css={css`
        min-width: 200px;
        margin: 12px;
    `}>
        <div css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}>
            <CardHeader title={props.product?.Title} subheader={`${props.product?.Price} рублей`}/>
            {props.children}
        </div>

        <GatsbyImage css={css`min-width: 100%`} alt={props.product?.Title ?? ""} image={props.product?.Image!}/>
    </Card>
}
