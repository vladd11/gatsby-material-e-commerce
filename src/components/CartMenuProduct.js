import CartProduct from "./CartProduct";
import ActionButton from "./ui/ActionButton";
import * as cartStyles from "../styles/components/cart-product.module.sass";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import React, {useState} from "react";

function CartMenuProduct({product, onDelete}) {
    const [count, setCount] = useState(product.count)

    return <CartProduct product={product}>
        <div className={cartStyles.counter}>
            <ActionButton
                className={cartStyles.counterDecreaseButton}
                onClick={() => {
                    if (count === 1) {
                        onDelete()
                    } else {
                        product.count--;
                        setCount(product.count)
                    }
                }}>
                {(count === 1) ? <DeleteForeverIcon/> : <RemoveIcon/>}
            </ActionButton>

            <span className={cartStyles.counterText}>
                {product.count}
            </span>

            <ActionButton
                className={cartStyles.counterIncreaseButton}
                onClick={() => {
                    product.count++;
                    setCount(product.count)
                }}>
                <AddIcon/>
            </ActionButton>
        </div>
    </CartProduct>
}

export default CartMenuProduct;
