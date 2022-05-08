import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import * as cardStyles from '../styles/components/product.module.sass'

const Product = ({product, whenAddedToCart, disabled, loading = "lazy"}) => {
    return <div className={cardStyles.card}>
        <div className={cardStyles.header}>
            {product.Title}
        </div>

        <div className={cardStyles.content}>
            <span>
                {product.Description}
            </span>
            <span>
                {product.Price / 100} рублей
            </span>
        </div>

        <GatsbyImage loading={loading} className={cardStyles.image} alt={product.Title} image={product.Image}/>

        <button className={cardStyles.addCartButton}
                onClick={whenAddedToCart}
                disabled={disabled}
                style={(disabled) ? {cursor: "auto"} : null}>
            {(disabled) ? "Добавлено" : "Добавить в корзину"}
        </button>
    </div>
}

export default Product