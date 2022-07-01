import {navigate} from "gatsby";
import OrderResponse from "./interfaces/order";

export default async function redirect(response: OrderResponse, phone: string, address: string, time: number, paymentMethod: string) {
    if (response.redirect) {
        window.location.replace(response.redirect)
    } else {
        localStorage.removeItem("cartProducts")
        await navigate(`/order/complete?orderID=${response.id}`, {
            state: {
                ...response,
                phone: phone,
                time: time,
                paymentMethod: paymentMethod
            }
        })
    }
}