import React, {MouseEventHandler} from 'react'
import {GatsbyImage} from "gatsby-plugin-image";
import {css} from "@emotion/react";

import {AddToCartButton, Card, InfoHeader, PriceElement, ShortDescription, Title} from './productStyles';
import ProductType from "../../types/product";

interface ProductProps {
    product: ProductType,
    whenAddedToCart?: MouseEventHandler<HTMLButtonElement>,
    disabled: boolean,
    loading?: "lazy" | "eager"
}

const Product = (props: ProductProps) => {
    return <Card>
        <Title>
            {props.product.Title}
        </Title>

        <InfoHeader>
            <ShortDescription dangerouslySetInnerHTML={{__html: props.product.ShortDescription!}}/>
            <PriceElement>
                {props.product.Price} рублей
            </PriceElement>
        </InfoHeader>

        <GatsbyImage css={css`
          min-width: 100%;
          flex: 1;
        `} loading={props.loading} alt={props.product.Title} image={props.product.Image!}/>

        <AddToCartButton css={css`cursor: ${(props.disabled) ? "auto" : "pointer"};`}
                         onClick={props.whenAddedToCart}
                         disabled={props.disabled}>
            {(props.disabled) ? "Добавлено" : "Добавить в корзину"}
        </AddToCartButton>
    </Card>
}

export default Product