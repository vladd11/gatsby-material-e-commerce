import type ProductType from "../interfaces/product"
import ProductComponent from "../components/products/ProductComponent";

type ProductProps = {
    pageContext: {
        data: any
        product: ProductType
    }
};

type ProductData = {}

export default function Product(props: ProductProps) {
    const {data, product} = props.pageContext

    return ProductComponent({
        product: product
    })
}