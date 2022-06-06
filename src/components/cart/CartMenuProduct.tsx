import CartProduct from "./CartProduct";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Fab from "@mui/material/Fab"

import React, {useState} from "react";
import {css} from "@emotion/react";

import Product from "../../interfaces/product";


interface CartMenuProductProps {
    product: Product,
    onDelete?: () => void
}

export default function CartMenuProduct(props: CartMenuProductProps) {
    const [count, setCount] = useState(props.product.count)

    return <CartProduct product={props.product}>
        <div css={css`
          display: flex;
          align-items: center;
        `}>
            <Fab size="small"
                 color="error"
                 aria-label={`Уменьшить количество ${props.product.Title}`}
                 onClick={() => {
                     if (count === 1) {
                         props.onDelete?.()
                     } else {
                         props.product.count!--;
                         setCount(props.product.count)
                     }
                 }}
                 sx={{
                     mr: 1
                 }}>
                {(count === 1) ? <DeleteForeverIcon/> : <RemoveIcon/>}
            </Fab>

            <span>
                {props.product.count}
            </span>

            <Fab size="small"
                 color="success"
                 aria-label={`Увеличить количество ${props.product.Title}`}
                 onClick={() => {
                     props.product.count!++;
                     setCount(props.product.count)
                 }}
                 sx={{
                     ml: 1,
                     mr: 1
                 }}>
                <AddIcon/>
            </Fab>
        </div>
    </CartProduct>
}
