import React from 'react'
import {GatsbyImage} from "gatsby-plugin-image";

import theme from "../theme";
import {css} from "@emotion/react";
import queries from "../queries";

const Product = ({product, whenAddedToCart, disabled, loading = "lazy"}) => {
    return <div css={css`
      width: 280px;
      margin: 20px;

      overflow: hidden;
      box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%);
    `}>
        <div css={css`
          padding: 16px;
          font-size: 1.5rem;
        `}>
            {product.Title}
        </div>

        <div css={css`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          padding: 0 16px 16px;

          line-height: 1.5;
          letter-spacing: 0.00938em;
        `}>
            <span>
                {product.Description}
            </span>
            <span>
                {product.Price} рублей
            </span>
        </div>

        <GatsbyImage css={css`
          min-width: 100%
        `} loading={loading} alt={product.Title} image={product.Image}/>

        <button css={css`
          width: 100%;
          padding: 8px;

          cursor: pointer;

          border: none;
          outline: none;

          line-height: 1.75;
          text-transform: uppercase;

          background: #fff;
          color: ${theme.palette.primary.main};

          &:disabled {
            color: rgba(0, 0, 0, 0.26)
          }

          ${queries.mobile} {
            max-width: 100%;
          }
        `}
                onClick={whenAddedToCart}
                disabled={disabled}
                style={(disabled) ? {cursor: "auto"} : null}>
            {(disabled) ? "Добавлено" : "Добавить в корзину"}
        </button>
    </div>
}

export default Product