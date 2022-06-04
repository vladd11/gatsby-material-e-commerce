import {OrderResponse} from "./api/api";
import {navigate} from "gatsby";

export default async function redirect(response: OrderResponse) {
    if(response.redirect) {
        window.location.replace(response.redirect)
    } else {
        await navigate(`/order-complete?orderID=${response.id}`)
    }
}