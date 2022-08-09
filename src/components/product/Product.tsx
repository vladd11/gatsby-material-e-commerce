import React, {MouseEventHandler} from 'react'
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {css} from "@emotion/react";

import {AddToCartButton, Card, InfoHeader, PriceElement, ShortDescription, Title} from './productStyles';
import ProductType from "../../types/product";

interface ProductProps {
    getImage: (uri: string) => IGatsbyImageData,
    getDescription: (uri: string) => string,

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
            <ShortDescription dangerouslySetInnerHTML={{__html: props.getDescription(props.product.DescriptionURI)}}/>
            <PriceElement>
                {props.product.Price} рублей
            </PriceElement>
        </InfoHeader>

        <GatsbyImage css={css`
          min-width: 100%;
          flex: 1;
        `} loading={props.loading} alt={props.product.Title} image={props.getImage(props.product.ImageURI)}/>

        <AddToCartButton css={css`cursor: ${(props.disabled) ? "auto" : "pointer"};`}
                         onClick={props.whenAddedToCart}
                         disabled={props.disabled}>
            {(props.disabled) ? "Добавлено" : "Добавить в корзину"}
        </AddToCartButton>
    </Card>
}

export default Product