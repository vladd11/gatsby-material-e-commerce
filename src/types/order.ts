import {TimeRange} from "../currentDateTime";
import Product from "./product";

export default interface OrderResponse {
    redirect?: string,
    id?: string,

    phone: string,
    price: number,
    time: TimeRange,
    paymentMethod: string,
    products: Array<Product>
};