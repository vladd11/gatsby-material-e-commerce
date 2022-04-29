import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React from "react";
import useStickyState from "../stickyState";
import Typography from "@mui/material/Typography";
import {AppBar, Divider, Fab, FormControl, Input, InputLabel, List, Toolbar} from "@mui/material";
import CartProduct from "./CartProduct";
import * as orderStyles from "../styles/order.module.css"

const OrderComponent = () => {
    const [cartProducts] = useStickyState([], 'cartProducts')
    const [phone, setPhone] = useStickyState('', 'phone')

    return <div className={orderStyles.order}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Оформление заказа
                </Typography>
            </Toolbar>
        </AppBar>

        <List style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {
                cartProducts.map(cartProduct => {
                    return <CartProduct product={cartProduct}/>
                })
            }
        </List>

        <Typography sx={{marginLeft: "12px"}}>
            Итого:
            <span style={{paddingLeft: "4px", fontWeight: "bold"}}>
                {cartProducts.reduce((n, cartProduct) => {
                    return n + cartProduct.Price;
                }, 0) / 100} рублей
            </span>
        </Typography>

        <Divider style={{borderBottomWidth: "medium", marginTop: '4px'}}/>

        <FormControl sx={{mt: '16px'}} required={true} style={{width: "100%"}}>
            <InputLabel htmlFor="phone">Номер телефона</InputLabel>
            <Input id="phone" aria-describedby="tel" sx={{pl: 1}} value={phone} onChange={event => {
                setPhone(event.target.value)
            }}/>
        </FormControl>

        <Fab color="primary" aria-label="Заказать" variant="extended" style={{textTransform: 'initial'}}
             className={orderStyles.fab}>

            <LocalShippingIcon sx={{mr: 1}}/>
            Заказать
        </Fab>
    </div>
}

export default OrderComponent;
