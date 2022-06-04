import Product from "./product";

export default interface OrderResponse {
    redirect?: string,
    id?: string,

    phone: string,
    price: number,
    time: number,
    products: Array<Product>
};