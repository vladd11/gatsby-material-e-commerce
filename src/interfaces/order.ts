import Product from "./product";

export default interface Order {
    products: Array<Product>,
    price: number,
    time: number
}