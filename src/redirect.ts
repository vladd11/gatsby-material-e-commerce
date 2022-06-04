import {navigate} from "gatsby";
import OrderResponse from "./interfaces/order";

export default async function redirect(response: OrderResponse) {
    if(response.redirect) {
        window.location.replace(response.redirect)
    } else {
        await navigate(`/order-complete?orderID=${response.id}`, {
            state: response
        })
    }
}