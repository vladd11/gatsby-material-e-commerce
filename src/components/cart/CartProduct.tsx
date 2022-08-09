import React, {ReactNode} from 'react'
import {css} from "@emotion/react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Product from "../../types/product";

interface CartProductProps {
    getImage: (imageUri: string) => IGatsbyImageData,
    product?: Product,
    children?: ReactNode
}

export default function CartProduct(props: CartProductProps) {
    let subheader = "";
    if (props.product) {
        subheader = `${props.product?.Price} рублей`
    }

    return <Card css={css`
      min-width: 200px;
      margin: 12px;
    `}>
        <div css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}>
            <CardHeader title={props.product?.Title ?? ""} subheader={subheader}/>
            {props.children}
        </div>

        <GatsbyImage css={css`min-width: 100%`}
                     alt={props.product?.Title ?? ""}
                     image={props.getImage(props.product?.ImageURI!)}/>
    </Card>
}
