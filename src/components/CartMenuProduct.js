import CartProduct from "./CartProduct";
import * as cartStyles from "../styles/cart-product.module.sass";
import Fab from "@mui/material/Fab";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import React, {useState} from "react";

function CartMenuProduct({product}) {
    const [count, setCount] = useState(product.count)

    return <CartProduct product={product}>
        <div className={cartStyles.counter}>
                <Fab
                    size="small"
                    color="error"
                    aria-label="Уменьшить количество продуктов"
                    onClick={() => {
                        if (count !== 1) {
                            product.count--;
                            setCount(product.count)
                        }
                    }}>
                    <RemoveIcon/>
                </Fab>

                <Typography sx={{
                    pl: 1,
                    pr: 1
                }}>
                    {product.count}
                </Typography>

                <Fab
                    size="small"
                    color="success"
                    aria-label="Увеличить количество продуктов"
                    sx={{
                        mr: 1
                    }}
                    onClick={() => {
                        product.count++;
                        setCount(product.count)
                    }}>
                    <AddIcon/>
                </Fab>
            </div>
    </CartProduct>
}

export default CartMenuProduct;
